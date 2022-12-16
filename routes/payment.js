const router = require('express').Router()
const payment = require('../controllers/payment')
const authorize = require('../middlewares/authorize')

router.post('/', authorize(), payment.payment)

module.exports = router
