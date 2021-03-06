const pool = require('../models/pool');

exports.createOne = async (req, res, next) => {
  console.log('first start');
  // logic goes here
  try {
    console.log('start');
    const title = req.body.title;
    const article = req.body.article;
    const createdOn = new Date().toISOString();
    const { userId } = res.locals;

    console.log('before template');
    const template = `INSERT INTO articles (title, article, createdon, authorid) VALUES ($1, $2, $3, $4) RETURNING articleid`;
    const id = await pool.query(template, [title, article, createdOn, userId]);

    console.log('before response');
    res.status(200).json({
      status: 'success',
      data: {
        message: 'Article successfully posted',
        articleId: id.rows[0].articleid,
        createdOn: createdOn,
        title: title,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      error: 'Not added',
      log: err,
    });
  }
};

exports.allArticles = async (req, res, next) => {
  try {
    const template = 'SELECT * FROM articles ORDER BY createdon DESC';
    const response = await pool.query(template);
    res.status(200).json({
      status: 'success',
      data: response.rows,
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      error: 'No article found',
      log: err,
    });
  }
};

exports.editArticle = async (req, res, next) => {
  try {
    const title = req.body.title;
    const article = req.body.article;
    const id = req.params.id;

    const template =
      'UPDATE articles SET title = $1, article = $2  WHERE articleid = $3';
    const updates = await pool.query(template, [title, article, id]);
    res.status(200).json({
      status: 'success',
      data: {
        message: 'Article successfully updated',
        title: title,
        article: article,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      error: 'Not updated',
      log: err,
    });
  }
};

exports.deleteArticle = async (req, res, next) => {
  try {
    const id = req.params.id;

    const template = 'DELETE FROM articles WHERE articleid = $1';
    const response = await pool.query(template, [id]);

    res.status(200).json({
      status: 'success',
      data: 'article successfully delete',
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      error: 'Not able to delete',
    });
  }
};
exports.viewArticle = async (req, res, next) => {
  try {
    const id = req.params.id;

    const articleTemplate = `SELECT * FROM articles WHERE articles.articleid = $1`;
    const articleinfo = await pool.query(articleTemplate, [id]);
    const article = articleinfo.rows[0];
    const commentTemplate = `SELECT commentid,comment,authorid FROM comments WHERE comments.articleid = $1`;
    const commentsinfo = await pool.query(commentTemplate, [id]);
    // response.rows,
    res.status(200).json({
      status: 'success',
      data: {
        id: article.articleid,
        createdOn: article.createdon,
        title: article.title,
        article: article.article,
        comments: commentsinfo.rows,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      error: 'article found',
      log: err,
    });
  }
};
