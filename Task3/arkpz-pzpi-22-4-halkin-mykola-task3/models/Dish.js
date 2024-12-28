const { DataTypes } = require('sequelize');
const db = require('../config/db.config.js');

const Dish = db.sequelize.define('Dish', {
    dishId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    restaurantId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'restaurant',
            key: 'restaurantId'
        },
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    tableName: 'dish',
    timestamps: false
});

module.exports = Dish;