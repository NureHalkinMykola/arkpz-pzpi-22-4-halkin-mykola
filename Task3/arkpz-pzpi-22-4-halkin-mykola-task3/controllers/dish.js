const Dish = require('../models/Relations').Dish;

const create = async (req, res) => {
    try {
        const {restaurantId, name, description, price} = req.body;
        const dish = await Dish.create({
            restaurantId,
            name,
            description,
            price
        });
        return res.status(201).json(dish);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

const getAll = async (req, res) => {
    try {
        const dish = await Dish.findAll();
        return res.status(200).json(dish);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

const deleter = async (req, res) => {
    try {
        const {dishId} = req.body;
        const dish = await Dish.destroy({
            where: { dishId: dishId },
        });
        return res.status(200).json(dish);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

const edit = async (req, res) => {
    try {
        const { id } = req.params;
        const changes = req.body;
        const [affectedRows] = await Dish.update(changes, {
            where: { dishId:id },
        });

        if (affectedRows > 0) {
            return res.status(200).json({ message: `Dish with ID ${id} updated successfully.` });
        } else {
            return res.status(404).json({ message: `No dish found with ID ${id}.` });
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