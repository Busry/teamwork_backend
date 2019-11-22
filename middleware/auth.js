const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const { userId } = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    if (req.body.userid && req.body.userid !== userId) {
      throw new Error('Invalid user Id');
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({
      error: new Error('Invalid request '),
    });
  }
};
