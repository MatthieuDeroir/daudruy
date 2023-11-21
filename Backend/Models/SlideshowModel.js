const mongoose = require('mongoose');
const MediaSchema = require('./MediaModel').schema;
const Schema = mongoose.Schema;

const SlideshowSchema = new Schema({
    name: String,
    media: [MediaSchema] // Ceci est un tableau de médias
});

const Slideshow = mongoose.model('Slideshow', SlideshowSchema);

module.exports = Slideshow;