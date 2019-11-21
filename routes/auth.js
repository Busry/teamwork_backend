// devDep
const express = require('express');
// controllers path
const userCtrl = require('../controllers/user');

const router = express.Router();

router.post('/create-user', userCtrl.createUser);

module.exports = router;
