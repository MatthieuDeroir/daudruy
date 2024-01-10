const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();


const app = express();

// Middleware pour parser les requêtes JSON
app.use(bodyParser.json());

app.use(cors());

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/truckDisplay', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Import des modèles
const Camion = require('./Models/CamionModel');
const Media = require('./Models/MediaModel');
const User = require('./Models/UserModel');

// Import des routes
const mediaRoutes = require('./Routes/MediaRoutes');
const camionRoutes = require('./Routes/CamionRoutes');
const authRoutes = require('./Routes/UserRoutes');
const settingsRoutes = require('./Routes/SettingsRoutes');




// Utilisation des routes pour les camions
app.use('/api/camions', camionRoutes);
// Utilisation des routes pour les médias
app.use('/api/media-management', mediaRoutes);
// Route statique pour les médias
app.use('/api/media', express.static('media'));
// Utilisation des routes pour l'authentification
app.use('/api/auth', authRoutes);
// Utilisation des routes pour les paramètres
app.use('/api/settings', settingsRoutes);






const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
