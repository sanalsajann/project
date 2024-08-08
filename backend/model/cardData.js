// model/eventData.js
const mongoose = require('mongoose');

const cardData = new mongoose.Schema({
  id:String,
  title: String,
  description: String,
  url: String,
  // add other fields as necessary
});

const Event = mongoose.model('events', cardData);

module.exports = Event;
