const express  = require('express');
const router = express.Router();

//getting all

router.get('/', (req, res) => {
  res.send('holi')
})

module.exports = router
