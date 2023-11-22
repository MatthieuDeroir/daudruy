const { DataTypes } = require('sequelize');
const sequelize = require('../Database/Sequelize');

const Media = sequelize.define('Media', {
  originalFilename: DataTypes.STRING,
  hashedFilename: DataTypes.STRING,
  user: DataTypes.STRING,
  format: DataTypes.STRING,
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  path: DataTypes.STRING,
  duration: DataTypes.INTEGER,
  order: DataTypes.INTEGER,
  type: DataTypes.STRING
  // data: {}, // Sequelize ne supporte pas directement les champs de type objet non structuré. Vous devrez peut-être le gérer différemment ou le sérialiser en tant que JSON.
});

module.exports = Media;
