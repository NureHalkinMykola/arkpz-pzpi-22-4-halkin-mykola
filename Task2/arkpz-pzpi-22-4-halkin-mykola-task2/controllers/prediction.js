//Making predictions

const Waiter = require('../models/Relations').Waiter;
const OrderDish = require('../models/Relations').OrderDish;
const Dish = require('../models/Relations').Dish;
const Order = require('../models/Relations').Order;

const predictDishPopularity = async (req, res) => {
    //Auth

    try {
        const result = await Dish.findAll();
        return res.status(201).json(result);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
    //Business logic
};

const predictAmountOfWaiters = async (req, res) => {
    //Auth

    try {
        const data = req.body;
        const result = await Waiter.findAll();
        return res.status(201).json(result);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
    //Business logic
};

module.exports = {
    predictDishPopularity,
    predictAmountOfWaiters
};