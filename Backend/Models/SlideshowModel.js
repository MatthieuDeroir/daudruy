const { DataTypes } = require('sequelize');
const sequelize = require('../Database/Sequelize');

const Slideshow = sequelize.define('Slideshow', {
    name: DataTypes.STRING,
});

module.exports = Slideshow;
