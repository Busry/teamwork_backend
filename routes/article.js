// devDep
const express = require('express');
// authenticating logic location
const auth = require('../middleware/auth');
// controllers path
const articleCtrl = require('../controllers/article');

const router = express.Router();

router.post('/', auth, articleCtrl.createOne);

module.exports = router;
