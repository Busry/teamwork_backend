const express = require('express');

const router = express.Router();

// const auth = require('../middleware/auth');
const gifCtrl = require('../controllers/gif');

router.post('/', gifCtrl.saveGif);
router.delete('/:id', gifCtrl.removeGif);

module.exports = router;
