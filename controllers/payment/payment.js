const { Booking, Payment, PaymentMethod } = require("../../models")
const { Op } = require("sequelize");

const payment = async (req, res, next) => {
  try {
    const { paymentMethod } = req.body
    const { booking_id, ticket_class } = req.params

    /*const booking = await Booking.findOne({
      where: {
        [Op.and] : [{user_id: user.id}, {status: 'pending'}]
      }
    })

    if(booking.length <= 0){
      return res.status(400).json({
        status: false,
        message: "You're not booking yet",
        data: null
      })
    }*/

    const method = await PaymentMethod.findOne({ where: { method: paymentMethod } })
    const payment = await Payment.create({
      booking_id,
      payement_method_id: method.id,
      total_price: null,
      date: new Date()
    })

    await Booking.update({ status: 'paid off' }, { where: { id: booking_id } })

    return res.status(201).json({
      status: true,
      message: 'Successful Payment',
      data: payment
    })
  } catch (err) {
    next(err)
  }
}

module.exports = payment
