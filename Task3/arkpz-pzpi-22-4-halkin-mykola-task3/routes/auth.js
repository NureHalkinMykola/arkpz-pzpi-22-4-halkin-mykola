const express = require('express');
const {isAdmin, login, logout, loginDevice, generateDeviceToken} = require('../controllers/auth.js');
const router = express.Router();

router.post('/login', login);
router.post('/loginDevice', loginDevice);
router.post('/logout', logout);
router.post('/generateToken', isAdmin, generateDeviceToken);

module.exports = router;