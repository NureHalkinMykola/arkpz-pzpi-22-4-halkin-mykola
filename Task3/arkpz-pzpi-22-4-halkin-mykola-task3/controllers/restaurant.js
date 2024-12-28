const Restaurant = require('../models/Relations').Restaurant;

const create = async (req, res) => {
    try {
        const {name} = req.body;
        const restaurant = await Restaurant.create({
            name
        });
        return res.status(201).json(restaurant);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

const deleter = async (req, res) => {
    try {
        const {restaurantId} = req.body;
        const restaurant = await Restaurant.destroy({
            where: { restaurantId: restaurantId },
        });
        return res.status(200).json(restaurant);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

const getAll = async (req, res) => {
    try {
        const restaurant = await Restaurant.findAll();
        return res.status(200).json(restaurant);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

module.exports = {
    create,
    deleter,
    getAll
};