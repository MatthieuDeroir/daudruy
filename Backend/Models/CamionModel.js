const {DataTypes} = require('sequelize');
const sequelize = require('../Database/Sequelize');

const Camion = sequelize.define('Camion', {
            immatriculation: {
                type: DataTypes.STRING,
                allowNull: false
            },
            action: {
                type: DataTypes.ENUM,
                values: ['go', 'wait'],
                allowNull: false
            },
            destination: {
                type: DataTypes.ENUM,
                values: ['Accueil', 'Balance'],
                allowNull: false
            },
            date_appel: {
                type: DataTypes.DATE,
                allowNull: false
            },
        },
        {
            timestamps: false,
            tableName: 'Camions',
        },
    );

module.exports = Camion;
