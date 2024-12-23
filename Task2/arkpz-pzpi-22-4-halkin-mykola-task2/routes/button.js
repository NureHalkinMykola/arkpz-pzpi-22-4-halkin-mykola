const express = require('express');
const {call, mark} = require('../controllers/button.js');
const router = express.Router();

router.post('/call', call);
router.post('/mark', mark);

module.exports = router;