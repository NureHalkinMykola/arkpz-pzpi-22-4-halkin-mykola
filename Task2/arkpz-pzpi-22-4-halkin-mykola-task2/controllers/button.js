//MF-1 Calling waiters to tables

const Waiter = require('../models/Relations').Waiter;
const Order = require('../models/Relations').Order;

const call = async (req, res) => {
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

//Update waiter efficeincy
const mark = async (req, res) => {
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
    call,
    mark
};