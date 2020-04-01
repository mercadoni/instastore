/**
 * Generate and verify jwt token
 */
const jwt = require('jsonwebtoken')
const serverConfig = require('../../config')

const secret = serverConfig.jwt_secret

const issue = (payload) => jwt.sign(payload, secret)
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (authHeader) {
    const token = authHeader.split(' ')[1]

    try {
      const payload = jwt.verify(token, secret)
      req.user = payload.id

      next()
    } catch (error) {
      return res.status(403).send('Invalid token')
    }
  } else {
    return res.status(401).send('Bearer token missing')
  }
}

module.exports = {
  issue,
  verifyToken,
}
