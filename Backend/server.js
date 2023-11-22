const express = require('express');
const mongoose = require('mongoose');
const cron = require('node-cron');
const db = require('./Database/Database');
const cors = require('cors');
require('dotenv').config();

const { initializeCamions } = require('./Controllers/CamionController');
const { initializeVeille } = require('./Controllers/VeilleController');
const { initializeSlideshowStatus } = require('./Controllers/SlideshowStatutController');

const userRoutes = require('./Routes/UserRoutes');
const camionRoutes = require('./Routes/CamionRoutes');
const veilleRoutes = require('./Routes/VeilleRoutes');
const slideshowRoutes = require('./Routes/SlideshowRoutes');
const mediaRoute = require('./Routes/MediaRoute');
const slideshowStatusRoute = require('./Routes/SlideshowStatutsRoutes');
const app = express();

// Connecter à MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/daudruy', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

// Middleware pour utiliser cors
app.use(cors()); // Utilisez cors ici - cela permettra les requêtes cross-origin

// Middleware pour parser le JSON
app.use(express.json());

try {
    initializeCamions();
    initializeVeille();
    initializeSlideshowStatus();
} catch (error) {
    console.error('Error while initializing', error);
}
// Routes
app.use('/api/auth', userRoutes);
app.use('/api/camion', camionRoutes);
app.use('/api/veille', veilleRoutes);
app.use('/api/slideshow', slideshowRoutes);
app.use('/api/media', mediaRoute);
app.use('/api/slideshow-status', slideshowStatusRoute)


// Middleware pour gérer les erreurs
app.use((err, req, res, next) => {
    console.error("error",err.stack);
    res.status(500).send('Something broke!');
});

// Démarrer le serveur
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
