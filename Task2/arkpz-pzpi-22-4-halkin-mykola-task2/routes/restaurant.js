const express = require('express');
const {create, deleter, getAll} = require('../controllers/restaurant.js');
const router = express.Router();

router.post('/create', create);
router.post('/delete', deleter);
router.get('/getAll', getAll);

module.exports = router;