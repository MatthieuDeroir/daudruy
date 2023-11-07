const bcrypt = require('bcrypt');
const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        set: (value) => bcrypt.hashSync(value, 10)  // Hasher le mot de passe avant de le sauvegarder
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
