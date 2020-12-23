const express = require('express')
const router = express.Router()
const Stores = require('../models/store')

router.get('/', async (req, res) => {
  try {
    const stores = await Store.find()
    res.json(stores)
  } catch (err) {
    res.status(500).json({ message: err.message })
  } 
})

module.exports = router; 