const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided' });
  }
  try {
    const { userId } = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    if (req.body.userid && req.body.userid !== userId) {
      throw new Error('Invalid user Id');
    } else {
      res.locals.userId = userId;
      next();
    }
  } catch (error) {
    res.status(400).json({
      error: new Error(' Invalid token'),
    });
  }
};
