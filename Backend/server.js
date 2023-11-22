require('dotenv').config();
require('./Database/Init')

const app = require('./Config/Express'); // Import de l'application Express configurée
const db = require('./Database/Database');

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

app.on('exit', () => {
    db.close();
});
