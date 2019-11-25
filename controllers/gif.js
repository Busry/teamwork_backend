const pool = require('../models/pool');
const cloudinary = require('../middleware/cloudinary-config');

exports.saveGif = async (req, res, next) => {
  try {
    const gif = req.files.photo;
    // const saveOptions = {
    //   public_id: `teamwork/${gif.name}`,
    // };
    const { userId } = res.locals;

    const imageInfo = await cloudinary.uploader.upload(
      gif.tempFilePath,
      (err, result) => {
        return result;
      }
    );

    const title = req.body.title;
    const imageUrl = imageInfo.url;
    const createdOn = imageInfo.created_at;

    const insert =
      'INSERT INTO gifs (title, imageurl, createdon, authorid) VALUES ($1, $2, $3, $4) RETURNING gifid';

    const id = await pool.query(insert, [title, imageUrl, createdOn, userId]);

    res.status(200).json({
      status: 'success',
      data: {
        gifId: id.rows[0].gifid,
        message: 'gif is successfully uploaded',
        createdOn: createdOn,
        title: title,
        imageUrl: imageUrl,
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

exports.removeGif = async (req, res, next) => {
  try {
    const id = req.params.id;

    const template = 'DELETE FROM gifs WHERE gifid = $1 RETURNING imageurl';

    const rowData = await pool.query(template, [id]);
    const imageUrl = rowData.rows[0].imageurl;

    const url = imageUrl.split('/');
    const [public_id, ext] = url[url.length - 1].split('.');

    const info = await cloudinary.uploader.destroy(public_id, (err, result) => {
      return result;
    });

    res.status(200).json({
      status: info.result,
      data: 'gif post successfully delete',
      imageurl: imageUrl,
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      error: 'Not able to delete gif post',
    });
  }
};

exports.viewGif = async (req, res, next) => {
  try {
    const id = req.params.id;

    const gifTemplate = `SELECT * FROM gifs WHERE gifs.gifid = $1`;
    const gifinfo = await pool.query(gifTemplate, [id]);
    const gif = gifinfo.rows[0];
    const commentTemplate = `SELECT commentid,comment,authorid FROM comments WHERE comments.gifid = $1`;
    const commentsinfo = await pool.query(commentTemplate, [id]);
    // response.rows,
    res.status(200).json({
      status: 'success',
      data: {
        id: gif.gifid,
        createdOn: gif.createdon,
        title: gif.title,
        url: gif.imageurl,
        comments: commentsinfo.rows,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      error: 'gif post not found',
      log: err,
    });
  }
};
