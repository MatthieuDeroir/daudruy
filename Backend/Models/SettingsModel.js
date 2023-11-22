const {DataTypes} = require('sequelize');
const sequelize = require('../Database/Sequelize');

const Settings = sequelize.define('Settings', {
    enable: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    stop: DataTypes.STRING,
    start: DataTypes.STRING
});

module.exports = Settings;
