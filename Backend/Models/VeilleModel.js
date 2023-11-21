const mongoose = require('mongoose');

const VeilleSchema = new mongoose.Schema({
  enable: {
    type: Boolean,
    default: false,
  },
  stop: {
    type: String,
  },
  start: {
    type: String,
  },
});



const Veille = mongoose.model('Veille', VeilleSchema);

module.exports = Veille;