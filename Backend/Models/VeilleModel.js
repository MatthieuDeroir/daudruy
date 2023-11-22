const {DataTypes} = require('sequelize');
const sequelize = require('../Database/Sequelize');

const Veille = sequelize.define('Veille', {
    enable: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    stop: DataTypes.STRING,
    start: DataTypes.STRING
});

module.exports = Veille;
