const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql'
    }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = require('./User')(sequelize, Sequelize);

module.exports = db;
