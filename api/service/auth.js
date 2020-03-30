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

    jwt.verify(token, secret, (err, payload) => {
      if (err) {
        return res.status(403)
      }

      req.user = payload.id
      next()
    })
  } else {
    return res.status(401)
  }
}

module.exports = {
  issue,
  verifyToken,
}
