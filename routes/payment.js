const router = require('express').Router()
const payment = require('../controllers/payment')
const authorize = require('../middlewares/authorize')

router.post('/:booking_id/:ticketClass', authorize(), payment.payment)

module.exports = router
