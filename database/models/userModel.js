const Sequelize = require('sequelize');
const sequelize = require('../database-config');

const User = sequelize.define('user', {
    // attributes
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    firstname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastname: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = User;