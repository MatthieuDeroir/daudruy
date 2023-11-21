const mongoose = require('mongoose');
const { Schema } = mongoose;

const SlideshowStatusSchema = new Schema({
  slideshowId: {
    type: Schema.Types.ObjectId,
    ref: 'Slideshow', // Référence à la table principale des diaporamas
  },
  isRunning: {
    type: Boolean,
    default: false,
  },
  isTesting : {
    type: Boolean,
    default: false,
  },
});

const SlideshowStatus = mongoose.model('SlideshowStatus', SlideshowStatusSchema);
module.exports = SlideshowStatus;
