const Order = require('../models/Relations').Order;

const create = async (req, res) => {
    try {
        const {waiterId, date} = req.body;
        const order = await Order.create({
            waiterId,
            date,
            activity:true
        });
        return res.status(201).json(order);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

const getAll = async (req, res) => {
    try {
        const order = await Order.findAll();
        return res.status(200).json(order);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

const deleter = async (req, res) => {
    try {
        const {orderId} = req.body;
        const order = await Order.destroy({
            where: { orderId: orderId },
        });
        return res.status(200).json(order);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

const edit = async (req, res) => {
    try {
        const { id } = req.params;
        const changes = req.body;
        const [affectedRows] = await Order.update(changes, {
            where: { orderId:id },
        });

        if (affectedRows > 0) {
            return res.status(200).json({ message: `Order with ID ${id} updated successfully.` });
        } else {
            return res.status(404).json({ message: `No order found with ID ${id}.` });
        }
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

module.exports = {
    create,
    getAll,
    deleter,
    edit
};