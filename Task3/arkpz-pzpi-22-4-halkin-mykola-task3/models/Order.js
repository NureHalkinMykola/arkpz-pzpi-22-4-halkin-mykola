const {DataTypes} = require('sequelize');
const db = require('../config/db.config.js');

const Order = db.sequelize.define('Order', {
    orderId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    waiterId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'waiter',
            key: 'waiterId'
        },
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    activity: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    tableName: 'order',
    timestamps: false
});

module.exports = Order;