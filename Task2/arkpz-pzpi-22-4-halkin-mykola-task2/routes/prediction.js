const express = require('express');
const {predictDishPopularity, predictAmountOfWaiters} = require('../controllers/prediction.js');
const router = express.Router();

router.get('/dish', predictDishPopularity);
router.get('/waiter', predictAmountOfWaiters);

module.exports = router;