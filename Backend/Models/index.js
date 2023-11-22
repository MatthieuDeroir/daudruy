const sequelize = require('../Database/Sequelize');

const Camion = require('./CamionModel');
const Media = require('./MediaModel');
const Slideshow = require('./SlideshowModel');
const SlideshowStatus = require('./SlideshowStatusModel');
const User = require('./UserModel');
const Veille = require('./VeilleModel');

Media.belongsTo(Slideshow);
Slideshow.hasMany(Media, {as: 'medias'});

module.exports = {
    Camion,
    Media,
    Slideshow,
    SlideshowStatus,
    User,
    Veille
};
