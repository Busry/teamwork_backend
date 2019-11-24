const pool = require('../models/pool');
const cloudinary = require('../middleware/cloudinary-config');

exports.saveGif = async (req, res, next) => {
  try {
    const gif = req.files.photo;

    const imageInfo = await cloudinary.uploader.upload(gif.tempFilePath, (err, result) => {
      return result;
    });

    const title = req.body.title;
    const imageUrl = imageInfo.url;
    const createdOn = imageInfo.created_at;

    const insert = 'INSERT INTO gifs (title, imageurl, createdon) VALUES ($1, $2, $3)';
    const select = 'SELECT * FROM gifs WHERE title = $1 AND imageurl = $2 AND createdon = $3';

    const inserted = await pool.query(insert, [title, imageUrl, createdOn]);
    const tuple = await pool.query(select, [title, imageUrl, createdOn]);

    res.status(200).json({
      status: 'success',
      // data: tuple.rows[0],
      data: {
        gifId: tuple.rows[0].gifid,
        message: 'gif is successfully uploaded',
        createdOn: tuple.rows[0].createdon,
        title: tuple.rows[0].title,
        imageUrl: tuple.rows[0].imageurl,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      error: 'gif not added',
      log: err,
    });
  }
};
