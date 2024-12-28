const express = require('express');
const session = require('express-session');
const app = express();
const db = require('./config/db.config.js');
const Relations = require("./models/Relations.js");
const cors = require('cors');
const path = require('path');

const PORT = process.env.PORT || 5002;

const restaurantRoutes = require('./routes/restaurant.js');
const waiterRoutes = require('./routes/waiter.js');
const dishRoutes = require('./routes/dish.js');
const orderRoutes = require('./routes/order.js');
const orderDishRoutes = require('./routes/orderDish.js');
const buttonRoutes = require('./routes/button.js');
const predictionRoutes = require('./routes/prediction.js');
const authRoutes = require('./routes/auth.js');
const backUpRoutes = require('./routes/backUp.js');

app.use(cors());
app.use(express.json());

app.use(session({
    secret: 'restaurant24',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.use('/restaurant', restaurantRoutes);
app.use('/waiter', waiterRoutes);
app.use('/dish', dishRoutes);
app.use('/order', orderRoutes);
app.use('/orderDish', orderDishRoutes);
app.use('/button', buttonRoutes);
app.use('/prediction', predictionRoutes);
app.use('/auth', authRoutes);
app.use('/db', backUpRoutes);

db.sequelize.sync()
    .then(() => {
        console.log('Database connected');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            console.log(`http://localhost:${PORT}`);
        });
    })
    .catch(err => console.error('Failed to sync models:', err));

module.exports = app;