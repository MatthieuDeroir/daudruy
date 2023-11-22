const express = require('express');
const cors = require('cors');
const Routes = require('../Routes/index');

const app = express();

const configureApp = () => {
    app.use(cors());
    app.use(express.json());

    // Routes
    app.use('/api/camion', Routes.Camion);
    app.use('/api/media', Routes.Media);
    app.use('/api/slideshow', Routes.Slideshow);
    app.use('/api/slideshow-status', Routes.SlideshowStatus);
    app.use('/api/veille', Routes.Settings);
    app.use('/api/auth', Routes.User);

    app.use((err, req, res, next) => {
        console.error("error", err.stack);
        res.status(500).send('Something broke!');
    });
};

configureApp();

module.exports = app;