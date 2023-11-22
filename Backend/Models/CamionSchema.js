const mongoose = require('mongoose');


const CamionSchema = new mongoose.Schema({
    immatriculation: {
        type: String,
        trim: true,
    },
    action: {
        type: String,
        required: true,
        enum: ['go', 'wait']
    },
    destination: {
        type:String,
        required: true,
        enum: ['Accueil', 'Balance']
    },
    date_appel: {
        type: Date,
        required: true
    }
});

const Camion = mongoose.model('Camion', CamionSchema);
module.exports = Camion;
