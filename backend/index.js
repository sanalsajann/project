const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Middleware
const app = express();
app.use(cors());
app.use(express.json());

// Import models
const eventModel = require('./model/eventData'); // Ensure this path is correct
const cardModel = require('./model/cardData'); // Ensure this path is correct
const eventdetModel = require('./model/detailsData'); // Ensure this path is correct
const profileModel = require('./model/profileData'); // Profile model

// Connect to MongoDB (ensure this path is correct and you have the correct connection string)
require('./connection');

const PORT = 4002;

app.get('/eventdeets', async (req, res) => {
  try {
    const events = await cardModel.find({}).limit(10); // Add pagination or limit
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get('/eventpages/:eid', async (req, res) => {
  try {
    const eventId = req.params.eid; // Use 'eid' to match the route parameter
    const event = await eventdetModel.findOne({ eid: eventId });
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
// User login endpoint
app.post("/logins", (req, res) => {
  const { username, password } = req.body;
  eventModel.findOne({ username: username })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          res.json("success");
        } else {
          res.json("Incorrect password");
        }
      } else {
        res.json("No record exists");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

// Create user and profile
app.post('/events', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Create the signup document
      const signup = await eventModel.create([{ username, email, password }], { session });

      // Define a new profile document with default values
      const newProfile = {
        username: signup[0].username,
        name: '',        // Default or empty value
        dob: null,       // Default or empty value
        gender: '',      // Default or empty value
        email: signup[0].email,
        phone: ''        // Default or empty value
      };

      // Create the profile document
      const profile = await profileModel.create([newProfile], { session });

      // Commit the transaction
      await session.commitTransaction();
      session.endSession();

      // Return both signup and profile
      res.json({ signup: signup[0], profile: profile[0] });

    } catch (err) {
      // Rollback the transaction if there is an error
      await session.abortTransaction();
      session.endSession();
      console.error('Error:', err);
      res.status(500).json({ message: "Error creating documents" });
    }

  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update user profile
app.put('/profiles/:username', (req, res) => {
  const { username } = req.params;
  const updatedData = req.body;

  profileModel.findOneAndUpdate({ username: username }, updatedData, { new: true })
    .then((updatedProfile) => {
      if (updatedProfile) {
        res.json(updatedProfile);
      } else {
        res.status(404).json({ message: "Profile not found" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

// Fetch user profile data
app.get('/profiles/:username', (req, res) => {
  profileModel.findOne({ username: req.params.username })
    .then((profile) => {
      if (profile) {
        res.json(profile);
      } else {
        res.status(404).json({ message: "Profile not found" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

app.post('/fetch-events', async (req, res) => {
  const { registered_events } = req.body;
  console.log("Received event IDs:", registered_events); // Log received IDs

  if (!registered_events || !Array.isArray(registered_events)) {
    return res.status(400).json({ message: "Invalid event IDs" });
  }

  try {
    const eventIds = registered_events.map(String);
    console.log("Querying for event IDs:", eventIds); // Log IDs being queried

    const events = await eventModel.find({ id: { $in: eventIds } });
    console.log("Fetched events:", events); // Log fetched events

    if (events.length === 0) {
      return res.status(404).json({ message: "No events found for the provided IDs" });
    }

    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});





// Fetch events based on registered event IDs from the profile
app.get('/registered-events/:username', async (req, res) => {
  try {
    // Find profile by username
    const profile = await profileModel.findOne({ username: req.params.username });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Get registered event IDs from profile
    const registeredEventIds = profile.registered_events;
    if (!registeredEventIds || registeredEventIds.length === 0) {
      return res.status(404).json({ message: "No registered events found" });
    }

    // Fetch event details from events collection
    const events = await eventModel.find({ id: { $in: registeredEventIds } });
    if (events.length === 0) {
      return res.status(404).json({ message: "No events found for the provided IDs" });
    }

    res.json(events);
  } catch (err) {
    console.error('Error fetching registered events:', err);
    res.status(500).json({ message: "Error fetching registered events" });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
