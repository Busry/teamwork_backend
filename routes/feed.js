// devDep
const express = require('express');
// authenticating logic location
const auth = require('../middleware/auth');
// controllers path
const feedCtrl = require('../controllers/feed');

const router = express.Router();

router.get('/', auth, feedCtrl.allpost);

module.exports = router;
