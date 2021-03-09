'use strict'

const { Router } = require('express')
const { BadRequest } = require('../utils/errors')
const { validate, getCloseDistanceFromOnePoint } = require('../utils')
const { Store } = require('../db')

const router = new Router()

router.get('/stores', async function getSores (_, res) {
  const stores = await Store.find()

  res.send({
    stores
  })
})

router.get('/nextStore', async function getSores (req, res, next) {
  const stores = await Store.find()
  const { lat, lon } = req.query

  if (!validate.isLatitude(lat) || !validate.isLongitude(lon)) {
    next(
      new BadRequest(
        'Please, provide a correct lat and lon as query parameters'
      )
    )
  } else {
    const closestStore = getCloseDistanceFromOnePoint(lat, lon, stores)

    res.send({
      stores: closestStore
    })
  }
})

router.post('/stores', async function insertStore (req, res, next) {
  try {
    const { body } = req

    const store = new Store(body)
    const storeSaved = await store.save()
    const storeId = storeSaved._id.toString()

    res.send({ _id: storeId })
  } catch (error) {
    next(new BadRequest(error))
  }
})

module.exports = router
