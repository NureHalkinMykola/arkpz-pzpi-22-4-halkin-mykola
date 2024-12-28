const bcrypt = require('bcryptjs');
const Waiter = require('../models/Relations').Waiter;

const create = async (req, res) => {
    try {
        const {restaurantId, lastName, name, password, sex} = req.body;

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const waiter = await Waiter.create({
            restaurantId,
            lastName,
            name,
            password: hashedPassword,
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
    try {
        const waiter = await Waiter.findAll();
        return res.status(200).json(waiter);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

const getById = async (req, res) => {
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
    try {
        const { id } = req.params;
        const changes = req.body;

        if (changes.password) {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(changes.password, saltRounds);
            changes.password = hashedPassword;
        }
        
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