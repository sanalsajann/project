const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, required: false },  
  dob: { type: Date, required: false },      
  gender: { type: String, required: false }, 
  email: { type: String, required: true },
  phone: { type: String, required: false },  
  registered_events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }] 
});

module.exports = mongoose.model('Profile', profileSchema);
