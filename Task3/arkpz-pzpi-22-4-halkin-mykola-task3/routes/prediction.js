const express = require('express');
const {predictDishPopularity, predictAmountOfWaiters} = require('../controllers/prediction.js');
const { isAdmin } = require('../controllers/auth.js');
const router = express.Router();

router.get('/dish', isAdmin, predictDishPopularity);
router.get('/waiter', isAdmin, predictAmountOfWaiters);

module.exports = router;