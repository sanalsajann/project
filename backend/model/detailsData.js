const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Middleware
const app = express();
app.use(cors());
app.use(express.json());

// Event schema and model
const eventdetSchema = new mongoose.Schema({
    eid: String,
    title: String,
    date: String,
    time: String,
    address: String,
    description: String,
    orgName: String,
    orgCompany: String,
    url: String
});


const Event1 = mongoose.model('eventpages', eventdetSchema);

module.exports = Event1;
