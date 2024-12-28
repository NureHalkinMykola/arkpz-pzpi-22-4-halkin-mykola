const express = require('express');
const {create, getAll, getByOrder, edit, deleter} = require('../controllers/orderDish.js');
const { isAuthenticated, isAdmin } = require('../controllers/auth.js');
const router = express.Router();

router.post('/create', isAuthenticated, create);
router.get('/getAll', isAuthenticated, getAll);
router.get('/getByOrder', isAuthenticated, getByOrder);
router.post('/edit/:dishId/:orderId', isAdmin, edit);
router.post('/delete', isAdmin, deleter);

module.exports = router;