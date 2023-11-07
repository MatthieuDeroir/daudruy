const mongoose = require('mongoose');

const CamionSchema = new mongoose.Schema({
    transporteur: {
        type: String,
        required: true,
        trim: true,
        maxlength: 13
    },
    immatriculation: {
        type: String,
        required: true,
        trim: true,
        maxlength: 8
    },
    quai: {
        type: String,
        required: true,
        trim: true,
        maxlength: 3
    },
    date_appel: {
        type: Date,
        required: true
    }
});

const Camion = mongoose.model('Camion', CamionSchema);
module.exports = Camion;
