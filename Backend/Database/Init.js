const {initializeCamions} = require('../Controllers/CamionController');
const {initializeSettings} = require('../Controllers/SettingsController');
const {initializeSlideshowStatus} = require('../Controllers/SlideshowStatusController');

function initialize() {
    try {
        initializeCamions();
        initializeSettings();
        initializeSlideshowStatus();
    } catch (error) {
        console.error('Error while initializing', error);
    }
}

module.exports = initialize;
