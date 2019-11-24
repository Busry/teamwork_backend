// devDep
const express = require('express');
// authenticating logic location
const auth = require('../middleware/auth');
// controllers path
const articleCtrl = require('../controllers/article');

const router = express.Router();

router.get('/', auth, articleCtrl.allArticles);
router.post('/', auth, articleCtrl.createOne);
router.put('/:id', auth, articleCtrl.editArticle);
router.delete('/:id', auth, articleCtrl.deleteArticle);

module.exports = router;
