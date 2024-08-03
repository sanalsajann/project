const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Middleware
const app = express();
app.use(cors());
app.use(express.json());

// Import models
const eventModel = require('./model/eventData'); // Ensure this path is correct
const cardModel = require('./model/cardData'); // Ensure this path is correct
const eventdetModel = require('./model/detailsData'); // Ensure this path is correct

// Connect to MongoDB (ensure this path is correct and you have the correct connection string)
require('./connection');

const PORT = 4002;

app.post("/logins", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await eventModel.findOne({ username: username });
    if (!user) {
      return res.json("No record exists");
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.json("Incorrect password");
    }
    res.json("success");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post('/events', async (req, res) => {
  try {
    const event = await eventModel.create(req.body);
    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

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

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
