// devDep
const express = require('express');
// controllers path
const setupCtrl = require('../controllers/setup');

const router = express.Router();

router.get('/', setupCtrl.welcome);
router.get('/setup', setupCtrl.setup);

module.exports = router;
