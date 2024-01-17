const bcrypt = require('bcrypt');
const { DataTypes } = require('sequelize');
const sequelize = require('../Database/Sequelize');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
});


User.beforeCreate(async (user, options) => {
    if (user.password) {
        user.password = await bcrypt.hash(user.password, 12);
    }
});

module.exports = User;
