const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['image', 'video']
    },
    path: {
        type: String,
        required: true,
        trim: true
    },
    duration: {
        type: Number,
        default: 30,
        required: true
    }
});

const Media = mongoose.model('Media', MediaSchema);
module.exports = Media;
