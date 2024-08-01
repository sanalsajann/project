const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4002;
const eventModel = require('./model/eventData');
require('./connection');
app.use(cors());
app.use(express.json());

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
});

app.post('/events', (req, res) => {
  eventModel.create(req.body)
    .then((signup) => res.json(signup))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`); // use template literals
});