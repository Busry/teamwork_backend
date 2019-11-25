const pool = require('../models/pool');
exports.allpost = async (req, res, next) => {
  try {
    const template = `SELECT articleid as id, title, article as article_url, createdon FROM articles
     UNION SELECT gifid as id, title, imageurl as article_url, createdon FROM gifs ORDER BY createdon DESC`;
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
