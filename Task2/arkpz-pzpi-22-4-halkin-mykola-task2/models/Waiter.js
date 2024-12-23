const { DataTypes } = require('sequelize');
const db = require('../config/db.config.js');

const Waiter = db.sequelize.define('Waiter', {
    waiterId: {
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
    lastName: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    sex: {
        type: DataTypes.STRING(6),
        allowNull: false
    },
    efficiency: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    activity: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
}, {
    tableName: 'waiter',
    timestamps: false
});

module.exports = Waiter;