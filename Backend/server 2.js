require('dotenv').config();

const app = require('./Config/Express'); // Import de l'application Express configurée
const db = require('./Database/Database');
const sequelize = require('./Database/Sequelize');

const init = require('./Database/Init')

async function startServer() {
    try {
        await sequelize.sync({ force: false });
        console.log("All models were synchronized successfully.");

        // Maintenant, exécutez toutes les fonctions d'initialisation qui dépendent des modèles
        await init();

        // Ensuite, démarrez votre serveur
        const app = require('./Config/Express');
        const port = process.env.PORT || 4000;
        app.listen(port, () => console.log(`Listening on port ${port}...`));
    } catch (error) {
        console.error('Error during model synchronization or server initialization', error);
    }
}

startServer();

//
// const port = process.env.PORT || 4000;
// app.listen(port, () => console.log(`Listening on port ${port}...`));
//
// app.on('exit', () => {
//     db.close();
// });
