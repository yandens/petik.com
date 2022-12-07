const router = require('express').Router()
const booking = require('../controllers/booking')

router.get('/search-flight', booking.booking)

module.exports = router
