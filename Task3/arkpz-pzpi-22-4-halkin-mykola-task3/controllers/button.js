//MF-1 Calling waiters to tables

const Waiter = require('../models/Relations').Waiter;
const Order = require('../models/Relations').Order;
let notifications = {}

//IoT device calling waiter to a table
const call = async (req, res) => {
    try {
        const waiter = await Waiter.findOne({
            where: { activity: false },
            order: [['efficiency', 'DESC']],
        });
        if (!waiter) {
            return res.status(404).json({ message: "No inactive waiter available" });
        }
        waiter.activity = true;
        await waiter.save();

        const newOrder = await Order.create({
            waiterId: waiter.waiterId,
            date: new Date(),
            activity: true 
        });

        const notification = {
            title: 'New Order Assigned',
            message: `You have been assigned a new order (Order ID: ${newOrder.orderId}).`,
            orderId: newOrder.orderId,
            waiterId: waiter.waiterId,
            table: req.table
        };

        if (!notifications[waiter.waiterId]) {
            notifications[waiter.waiterId] = [];
        }
        notifications[waiter.waiterId].push(notification);

        return res.status(201).json({
            message: "success",
            order: newOrder,
            waiter: waiter,
            table: req.table
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

//Waiter's mobile app checks for notifications
const check = async (req, res) => {
    const { waiterId } = req.body;

    try {
        const notification = notifications[waiterId]?.shift();

        if (notification) {
            return res.status(200).json({
                message: "Notification sent",
                notification: notification
            });
        } else {
            return res.status(200).json({
                message: "No notifications"
            });
        }

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

//Update waiter efficeincy
const mark = async (req, res) => {
    try {
        const { waiterId, newEfficiency } = req.body;
        const waiter = await Waiter.findByPk(waiterId);
        if (!waiter) {
            return res.status(404).json({ message: "Waiter not found" });
        }
        waiter.efficiency = newEfficiency;
        waiter.activity = false;
        await waiter.save();

        return res.status(200).json({ message: "Efficiency updated", waiter });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    call,
    mark,
    check
};