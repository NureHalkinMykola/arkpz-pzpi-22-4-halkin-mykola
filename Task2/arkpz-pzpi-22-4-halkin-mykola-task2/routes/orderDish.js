const express = require('express');
const {create, getAll, getByOrder, edit, deleter} = require('../controllers/orderDish.js');
const router = express.Router();

router.post('/create', create);
router.get('/getAll', getAll);
router.get('/getByOrder', getByOrder);
router.post('/edit/:dishId/:orderId', edit);
router.post('/delete', deleter);

module.exports = router;