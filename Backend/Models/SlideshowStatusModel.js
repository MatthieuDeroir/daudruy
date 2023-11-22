const { DataTypes } = require('sequelize');
const Slideshow = require('./SlideshowModel');
const sequelize = require('../Database/Sequelize');

const SlideshowStatus = sequelize.define('SlideshowStatus', {
  slideshowId: {
    type: DataTypes.INTEGER,
    references: {
      model: Slideshow,
      key: 'id'
    }
  },
  isRunning: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isTesting: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

module.exports = SlideshowStatus;
