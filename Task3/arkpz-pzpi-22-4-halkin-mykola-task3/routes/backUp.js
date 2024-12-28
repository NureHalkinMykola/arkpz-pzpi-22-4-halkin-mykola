const express = require('express');
const {backup, restore} = require('../controllers/backUp.js');
const { isAdmin } = require('../controllers/auth.js');
const router = express.Router();

router.post('/backup', isAdmin, backup);
router.post('/restore', isAdmin, restore);

module.exports = router;