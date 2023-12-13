const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './Database/db.sqlite',
    logging: false
});

module.exports = sequelize;

require('../Models/index');

sequelize.sync({ force: false }).then(() => {
    console.log("All models were synchronized successfully.");
})
    .catch(error => {
        console.error('Error during model synchronization', error);
    });
