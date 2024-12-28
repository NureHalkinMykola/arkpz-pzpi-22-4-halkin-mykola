const OrderDish = require('../models/Relations').OrderDish;

const create = async (req, res) => {
    try {
        const input = req.body;
        const orderDish = await OrderDish.bulkCreate(input);
        return res.status(201).json(orderDish);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

const getAll = async (req, res) => {
    try {
        const orderDish = await OrderDish.findAll();
        return res.status(200).json(orderDish);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

const getByOrder = async (req, res) => {
    try {
        const {orderId} = req.body;
        const orderDish = await OrderDish.findAll({where: {
            orderId: orderId
        }});
        return res.status(200).json(orderDish);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

const deleter = async (req, res) => {
    try {
        const {orderId, dishId} = req.body;
        const orderDish = await OrderDish.destroy({
            where: { orderId: orderId, dishId: dishId },
        });
        return res.status(200).json(orderDish);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

const edit = async (req, res) => {
    try {
        const dishId = req.params.dishId;
        const orderId = req.params.orderId;
        const changes = req.body;
        const [affectedRows] = await OrderDish.update(changes, {
            where: { dishId: dishId, orderId: orderId },
        });

        if (affectedRows > 0) {
            return res.status(200).json({ message: `Success` });
        } else {
            return res.status(404).json({ message: `Fail` });
        }
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

module.exports = {
    create,
    getAll,
    getByOrder,
    deleter,
    edit
};