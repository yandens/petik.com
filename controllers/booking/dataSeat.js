const { BookingDetails, Ticket } = require('../../models')

const dataSeat = async (req, res, next) => {
  try {
    const { flight_id } = req.params

    const seatData = await BookingDetails.findAll({
      where: { flight_id },
      include: [{
        model: Ticket,
        as: 'ticket'
      }]
    })

    const listSeat = []
    for (const seat of seatData) listSeat.push(seat.ticket.seatNumber)

    if (listSeat.length <= 0) {
      return res.status(400).json({
        status: false,
        message: 'No reserved seats!',
        data: null
      })
    }

    return res.status(200).json({
      status: true,
      message: 'Succes get the reserved seat!',
      data: listSeat
    })
  } catch (err) {
    next(err)
  }
}

module.exports = dataSeat
