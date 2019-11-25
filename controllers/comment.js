const pool = require('../models/pool');

exports.createComment = async (req, res, next) => {
  try {
    const article_id = req.params.id;
    const comment = req.body.comment;
    const createdOn = new Date().toISOString();

    const template =
      'INSERT INTO comments (comment, createdon,articleid) VALUES ($1, $2, $3) RETURNING commentid';

    const id = await pool.query(template, [comment, createdOn, article_id]);
    const search = 'SELECT * FROM articles WHERE articleid = $1 ';

    const tuple = await pool.query(search, [article_id]);
    const articleInfo = tuple.rows[0];

    res.status(200).json({
      status: 'success',
      data: {
        message: 'Comment successfully created',
        createdOn: createdOn,
        articleTitle: articleInfo.title,
        article: articleInfo.article,
        comment: comment,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      error: 'Comment not added',
      log: err,
    });
  }
};
exports.gifcomment = async (req, res, next) => {
  try {
    const gif_id = req.params.id;
    const comment = req.body.comment;
    const createdOn = new Date().toISOString();

    const template =
      'INSERT INTO comments (comment, createdon,gifid) VALUES ($1, $2, $3) RETURNING commentid';

    const id = await pool.query(template, [comment, createdOn, gif_id]);
    const search = 'SELECT * FROM gifs WHERE gifid = $1 ';

    const tuple = await pool.query(search, [gif_id]);
    const gifInfo = tuple.rows[0];

    res.status(200).json({
      status: 'success',
      data: {
        message: 'Comment successfully created on gif post',
        createdOn: createdOn,
        gifTitle: gifInfo.title,
        comment: comment,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      error: 'Comment not added',
      log: err,
    });
  }
};
