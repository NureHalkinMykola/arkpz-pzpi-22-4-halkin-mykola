const express = require('express');
const {create, deleter, getAll} = require('../controllers/restaurant.js');
const { isAdmin } = require('../controllers/auth.js');
const router = express.Router();

router.post('/create', isAdmin, create);
router.post('/delete', isAdmin, deleter);
router.get('/getAll', isAdmin, getAll);

module.exports = router;