const mongoose = require('mongoose');


const CamionSchema = new mongoose.Schema({
    immatriculation: {
        type: String,
        required: true,
        trim: true,
        maxlength: 8
    },
    action: {
        type: String,
        required: true,
        enum: ['go', 'wait']
    },
    destination: {
        type:String,
        required: true,
        enum: ['accueil', 'balance']
    },
    date_appel: {
        type: Date,
        required: true
    }
});

const Camion = mongoose.model('Camion', CamionSchema);
module.exports = Camion;
