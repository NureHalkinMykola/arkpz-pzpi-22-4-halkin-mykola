const express = require('express');
const {create, getAll, edit, deleter, getById} = require('../controllers/waiter.js');
const router = express.Router();

router.post('/create', create);
router.get('/getAll', getAll);
router.get('/getById', getById);
router.post('/edit/:id', edit);
router.post('/delete', deleter);

module.exports = router;