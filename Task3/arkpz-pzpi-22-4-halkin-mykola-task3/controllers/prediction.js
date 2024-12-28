//Making predictions

const db = require('../config/db.config.js');
const OrderDish = require('../models/Relations').OrderDish;
const Dish = require('../models/Relations').Dish;
const Order = require('../models/Relations').Order;

//predict popularity of every dish based on day of the week
const predictDishPopularity = async (req, res) => {
    try {
        const {days} = req.body; //how long in the future to predict
        const alpha = 0.6; //constant for exponential smoothing, 1 -> no smoothing

        const data = await OrderDish.findAll({
            attributes: ['dishId', 'quantity', 'orderId'],
            include: [{model: Order, attributes: ['date']}],
            order: [[db.sequelize.col('Order.date'), 'ASC']]
        });

        let popularityDate = {};
        data.forEach(order => {
            const dishId = order.dishId;
            const quantity = order.quantity;
            const orderDate = new Date(order.Order.date).toISOString().split('T')[0];
            if (!popularityDate[dishId]) {
                popularityDate[dishId] = [];
            }
            popularityDate[dishId].push({ orderDate, quantity });
        });

        let popularity = [];

        //begin predictions for every dish
        for (let dishId in popularityDate) {
            const dishData = popularityDate[dishId];
            let weeklyAverage = Array(7).fill(0);
            let weeklyCount = Array(7).fill(0);

            dishData.forEach(data => {
                const dayOfWeek = new Date(data.orderDate).getDay();
                //get quantity of ordered dish based on day of week
                weeklyAverage[dayOfWeek] += data.quantity;
                //get count of orders with dish based on day of week
                weeklyCount[dayOfWeek]++;
            });

            //get the average per order based on day of week
            weeklyAverage = weeklyAverage.map((total, index) =>
                weeklyCount[index] > 0 ? total / weeklyCount[index] : 0
            );

            //use data for prediction (without date)
            let smoothPopularity = 0;
            dishData.forEach((data, i) => {
                const { quantity } = data;
                if (i == 0) {
                    smoothPopularity = quantity;
                } else {
                    //exponential smoothing, used to predict general data (not regarding date)
                    smoothPopularity = alpha * quantity + (1 - alpha) * smoothPopularity;
                }
            });

            //use data for prediction (with date)
            let predictions = [];
            let lastSmooth = smoothPopularity;
            for (let i = 1; i <= days; i++) {
                const futureDate = new Date(getDate(i)).getDay();
                const historicalAverage = weeklyAverage[futureDate] || smoothPopularity;

                //modified exponential smoothing, used to predict dated data
                lastSmooth = alpha * historicalAverage + (1 - alpha) * lastSmooth;

                predictions.push({
                    date: futureDate,
                    predictedPopularity: lastSmooth
                });
            }

            const dish = await Dish.findByPk(dishId);
            popularity.push({
                dishId,
                name: dish.name,
                description: dish.description,
                price: dish.price,
                smoothPopularity,
                predictions
            });
        }

        popularity.sort((a, b) => b.smoothPopularity - a.smoothPopularity);

        return res.status(200).json({
            message: "success",
            data: popularity
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

//utility function to get desired day from now
function getDate(daysAhead) {
    const today = new Date();
    today.setDate(today.getDate() + daysAhead);
    return today.toISOString().split('T')[0];
}

//predict amount of waiters that would be needed based on day of the week
const predictAmountOfWaiters = async (req, res) => {
    try {
        const {days} = req.body; //how long in the future to predict
        const alpha = 0.6; //constant for exponential smoothing, 1 -> no smoothing

        const ordersData = await Order.findAll({
            attributes: ['orderId', 'waiterId', 'date'],
            order: [[db.sequelize.col('date'), 'ASC']]
        });

        let weeklyAverage = Array(7).fill(0);
        ordersData.forEach(order => {
            const orderDate = (new Date(order.date)).getDay();
            //count of orders per day of week
            weeklyAverage[orderDate]++;
        });

        let predictions = [];
        for (let i = 1; i <= days; i++) {
            const futureDate = (new Date(getDate(i))).getDay();
            //exponential smoothing, used to predict data
            let predictedWaiters = alpha * weeklyAverage[futureDate] + (1 - alpha) * (weeklyAverage[futureDate]);

            predictions.push({
                date: futureDate,
                predictedWaiters: Math.round(predictedWaiters)
            });
        }

        return res.status(200).json({
            message: "success",
            data: predictions
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    predictDishPopularity,
    predictAmountOfWaiters
};