// devDep
const express = require('express');
// authenticating logic location
const auth = require('../middleware/auth');
// controllers path
const articleCtrl = require('../controllers/article');
const commentCtrl = require('../controllers/comment');

const router = express.Router();

router.get('/', auth, articleCtrl.allArticles);
router.post('/', auth, articleCtrl.createOne);
router.put('/:id', auth, articleCtrl.editArticle);
router.delete('/:id', auth, articleCtrl.deleteArticle);
router.post('/:id/comments', auth, commentCtrl.createComment);

module.exports = router;
