const { Sequelize, DataTypes } = require('sequelize');

const Restaurant = require('./Restaurant.js');
const Dish = require('./Dish.js');
const Order = require('./Order.js');
const OrderDish = require('./OrderDish.js');
const Waiter = require('./Waiter.js');

Restaurant.hasMany(Dish, { foreignKey: 'restaurantId' });
Dish.belongsTo(Restaurant, { foreignKey: 'restaurantId' });

Restaurant.hasMany(Waiter, { foreignKey: 'restaurantId' });
Waiter.belongsTo(Restaurant, { foreignKey: 'restaurantId' });

Waiter.hasMany(Order, { foreignKey: 'waiterId' });
Order.belongsTo(Waiter, { foreignKey: 'waiterId' });

Order.hasMany(OrderDish, { foreignKey: 'orderId' });
OrderDish.belongsTo(Order, { foreignKey: 'orderId' });

Dish.hasMany(OrderDish, { foreignKey: 'dishId' });
OrderDish.belongsTo(Dish, { foreignKey: 'dishId' });

module.exports = {
    Restaurant,
    Dish,
    Order,
    OrderDish,
    Waiter
};