const express = require('express');
const {create, getAll, edit, deleter} = require('../controllers/order.js');
const { isAuthenticated, isAdmin } = require('../controllers/auth.js');
const router = express.Router();

router.post('/create', isAuthenticated, create);
router.get('/getAll', isAuthenticated, getAll);
router.post('/edit/:id', isAdmin, edit);
router.post('/delete', isAdmin, deleter);

module.exports = router;