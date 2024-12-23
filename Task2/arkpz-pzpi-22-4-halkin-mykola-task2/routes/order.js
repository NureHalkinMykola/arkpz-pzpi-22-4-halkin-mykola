const express = require('express');
const {create, getAll, edit, deleter} = require('../controllers/order.js');
const router = express.Router();

router.post('/create', create);
router.get('/getAll', getAll);
router.post('/edit/:id', edit);
router.post('/delete', deleter);

module.exports = router;