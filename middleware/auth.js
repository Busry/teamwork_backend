const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const { userId } = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    console.log(
      `userId=>${userId}...req.body.userid=>${req.body.userid}......`
    );
    if (req.body.userid && req.body.userid !== userId) {
      throw new Error('Invalid user Id');
    } else {
      res.locals.userId = userId;
      next();
    }
  } catch (error) {
    res.status(401).json({
      error: new Error('Invalid request '),
    });
  }
};
