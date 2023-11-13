const mongoose = require("mongoose");

const MediaSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  originalFilename: {
    type: String,
  },
  hashedFilename: {
    type: String,
  },
  user: {
    type: String,
  },
  format: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  path: {
    type: String,
  },
  duration: {
    type: Number,
  },
  order: {
    type: Number,
  },
  type: {
    type: String,
  },

  data: {},
});

const Medias = mongoose.model("Medias", MediaSchema);

module.exports = Medias;
