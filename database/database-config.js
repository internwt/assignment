// setting up sequelize connection to database
const Sequelize = require('sequelize');
module.exports = new Sequelize('backend_test', 'postgres', 'gqtygjhidt1124', {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
