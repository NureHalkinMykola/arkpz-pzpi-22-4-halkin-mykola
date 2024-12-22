const {DataTypes} = require('sequelize');
const db = require('../config/db.config.js');

const Restaurant = db.sequelize.define('Restaurant', {
    restaurantId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
}, {
    tableName: 'restaurant',
    timestamps: false
});

module.exports = Restaurant;