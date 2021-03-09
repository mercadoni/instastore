'use strict'

const store = require('./store')

module.exports = {
  store,
  errorHandler (err, req, res, next) {
    if (err) {
      let code = err.code || 500
      const { id } = req
      const { message, stack } = err
      console.error({ id, message, stack })
      res.status(code).send({ error: message })
      return
    }

    next()
  }
}
