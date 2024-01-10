const Slideshow = require('./SlideshowModel');
const Media = require('./MediaModel');

Slideshow.hasMany(Media, { as: 'media' });
Media.belongsTo(Slideshow, { as: 'slideshow' });