const express = require('express');

const router = express.Router();

// const auth = require('../middleware/auth');
const gifCtrl = require('../controllers/gif');
const commentCtrl = require('../controllers/comment');

router.post('/', gifCtrl.saveGif);
router.delete('/:id', gifCtrl.removeGif);
router.post('/:id/comments', commentCtrl.gifcomment);

module.exports = router;
