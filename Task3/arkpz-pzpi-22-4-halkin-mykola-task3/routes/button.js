const express = require('express');
const {call, mark, check} = require('../controllers/button.js');
const { isAuthenticated, isDeviceAuthenticated } = require('../controllers/auth.js');
const router = express.Router();

router.post('/call', isDeviceAuthenticated, call);
router.post('/mark', isDeviceAuthenticated, mark);
router.get('/check', isAuthenticated, check);

module.exports = router;