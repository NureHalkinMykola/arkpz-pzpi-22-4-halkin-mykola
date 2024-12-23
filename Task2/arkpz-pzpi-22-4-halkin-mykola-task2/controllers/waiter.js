const Waiter = require('../models/Relations').Waiter;

const create = async (req, res) => {
    //Auth

    try {
        const {restaurantId, lastName, name, password, sex} = req.body;
        const waiter = await Waiter.create({
            restaurantId,
            lastName,
            name,
            password,
            sex,
            efficiency:5,
            activity:false
        });
        return res.status(201).json(waiter);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

const getAll = async (req, res) => {
    //Auth

    try {
        const waiter = await Waiter.findAll();
        return res.status(200).json(waiter);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

const getById = async (req, res) => {
    //Auth

    try {
        const {waiterId} = req.body;
        const waiter = await Waiter.findAll({where: {
            waiterId: waiterId
        }});
        return res.status(200).json(waiter);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

const deleter = async (req, res) => {
    //Auth

    try {
        const {waiterId} = req.body;
        const waiter = await Waiter.destroy({
            where: { waiterId: waiterId },
        });
        return res.status(200).json(waiter);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

const edit = async (req, res) => {
    //Auth

    try {
        const { id } = req.params;
        const changes = req.body;
        const [affectedRows] = await Waiter.update(changes, {
            where: { waiterId:id }
        });

        if (affectedRows > 0) {
            return res.status(200).json({ message: `Waiter with ID ${id} updated successfully.` });
        } else {
            return res.status(404).json({ message: `No waiter found with ID ${id}.` });
        }
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

module.exports = {
    create,
    getAll,
    deleter,
    edit,
    getById
};