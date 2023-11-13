const express = require('express');
const mongoose = require('mongoose');
const cron = require('node-cron');
const cors = require('cors');
require('dotenv').config();

const { initializeCamions } = require('./Controllers/CamionController');

const userRoutes = require('./Routes/UserRoutes');
const camionRoutes = require('./Routes/CamionRoutes');
const veilleRoutes = require('./Routes/VeilleRoutes');
const slideshowRoutes = require('./Routes/SlideshowRoutes');
const mediaRoute = require('./Routes/MediaRoute');

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
} catch (error) {
    console.error('Error while initializing accident document', error);
}
// Routes
app.use('/api/auth', userRoutes);
app.use('/camions', camionRoutes);
app.use('/api/veille', veilleRoutes);
app.use('/api/slideshow', slideshowRoutes);
app.use('/api/media', mediaRoute);


// Middleware pour gérer les erreurs
app.use((err, req, res, next) => {
    console.error("error",err.stack);
    res.status(500).send('Something broke!');
});

// Démarrer le serveur
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
