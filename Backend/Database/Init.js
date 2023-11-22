const {initializeCamions} = require('../Controllers/CamionController');
const {initializeVeille} = require('../Controllers/VeilleController');
const {initializeSlideshowStatus} = require('../Controllers/SlideshowStatusController');

try {
    initializeCamions();
    initializeVeille();
    initializeSlideshowStatus();
} catch (error) {
    console.error('Error while initializing', error);
}