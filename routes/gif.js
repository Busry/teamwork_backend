const express = require('express');

const router = express.Router();

// const auth = require('../middleware/auth');
const gifCtrl = require('../controllers/gif');
const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');

router.post('/', auth, gifCtrl.saveGif);
router.delete('/:id', auth, gifCtrl.removeGif);
router.post('/:id/comments', auth, commentCtrl.gifcomment);

module.exports = router;
