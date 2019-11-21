const pool = require('../models/pool');

exports.createOne = async (req, res, next) => {
  // logic goes here
  const author = req.body.author;
  const title = req.body.title;
  const content = req.body.content;

  try {
    const template =
      'INSERT INTO articles (author, title, content) VALUES ($1, $2, $3)';
    const response = await pool.query(template, [author, title, content]);
    res.json({
      status: 'success',
      data: {
        author: author,
        title: title,
        content: content,
      },
    });
  } catch (err) {
    res.json({ status: 'not added: duplicate entry' });
  }
};
