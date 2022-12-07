const { Booking, Flight } = require("../../models");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const { GOFLIGHTLABS_ACCESS_KEY } = process.env

const filterFlight = async (departure, arrival) => {
  const url = `https://app.goflightlabs.com/advanced-flights-schedules?access_key=${GOFLIGHTLABS_ACCESS_KEY}&status=active`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "app.goflightlabs.com",
    },
  };
  const result = await fetch(url, options);
  const json = await result.json();
  const flights = json.data;

  const chosenFlight = flights.filter(flight => flight.departure.iataCode == departure && flight.arrival.iataCode == arrival)
  return chosenFlight
}

const createBooking = async (req, res, next) => {
  try {
    const user = req.user;
    const { departure = 'TOG', arrival = 'DLG' } = req.body

    /*const booking = await Booking.create({
      user_id: user.id,
      status: true,
      date: new Date(),
    });*/

    const flight = await filterFlight(departure, arrival);
    const createFlight = await Flight.create({
      departure: flight.departure.iataCode,
      arrival: flight.arrival.iataCode,
      departureTime: flight.departure.scheduledTime,
      arrivalTime: flight.arrival.scheduledTime
    })
  } catch (error) {
    next(error);
  }
};

module.exports = createBooking
