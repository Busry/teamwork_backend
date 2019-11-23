const pool = require('../models/pool');

exports.createOne = async (req, res, next) => {
  // logic goes here

  const title = req.body.title;
  const article = req.body.article;

  const now = new Date();
  const createdon = now.toISOString();

  try {
    const template =
      'INSERT INTO articles (title, article, createdon) VALUES ($1, $2, $3)';
    const inserted = await pool.query(template, [title, article, createdon]);
    const selectTemplate =
      'SELECT * FROM articles WHERE title = $1 AND article = $2 AND createdon = $3';
    const tuple = await pool.query(selectTemplate, [title, article, createdon]);

    res.status(200).json({
      status: 'success',
      data: tuple.rows[0],
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
    const template = 'SELECT * FROM articles';
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
