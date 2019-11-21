// devDep
const express = require('express');
// controllers path
const articleCtrl = require('../controllers/article');

const router = express.Router();

router.post('/', articleCtrl.createOne);

module.exports = router;
