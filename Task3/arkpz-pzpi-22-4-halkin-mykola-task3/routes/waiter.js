const express = require('express');
const {create, getAll, edit, deleter, getById} = require('../controllers/waiter.js');
const { isAdmin } = require('../controllers/auth.js');
const router = express.Router();

router.post('/create', isAdmin, create);
router.get('/getAll', isAdmin, getAll);
router.get('/getById', isAdmin, getById);
router.post('/edit/:id', isAdmin, edit);
router.post('/delete', isAdmin, deleter);

module.exports = router;