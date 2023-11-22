const bcrypt = require('bcrypt');
const { DataTypes } = require('sequelize');
const sequelize = require('../Database/Sequelize');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// Hook pour hasher le mot de passe (similaire à `pre('save')` dans Mongoose)
User.beforeCreate(async (user, options) => {
    if (user.password) {
        user.password = await bcrypt.hash(user.password, 12);
    }
});

module.exports = User;
