const jwt = require("jsonwebtoken");

const config = require('../config/generalConfig')

module.exports = function(req, res, next) {
    const token = req.header('jwt-token');
    
    if (!token) {
      return res.status(401).json({ message: 'Access Denied' });
    }

    try {
      const verifiedToken = jwt.verify(token, config.SECRET_WORD);
      req.user = verifiedToken;
      next();
    } catch (error) {
      return res.status(400).json({ message: 'Invalid Token' });
    }
}