const { Flight } = require("../../models");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const { GOFLIGHTLABS_ACCESS_KEY } = process.env;

const createFlight = async () => {
  try {
    const url = `https://app.goflightlabs.com/advanced-flights-schedules?access_key=${GOFLIGHTLABS_ACCESS_KEY}&status=scheduled`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "app.goflightlabs.com",
      },
    };
    const result = await fetch(url, options);
    const json = await result.json();
    const flights = json.data;

    const filterFlights = flights.filter(flight => flight.airline.iataCode == 'GA' || flight.airline.iataCode == 'IW' || flight.airline.iataCode == 'ID' || flight.airline.iataCode == 'JT')

    for (const flight of filterFlights) {
      const data = await Flight.create({
        airline: flight.airline.name,
        origin: flight.departure.iataCode,
        destination: flight.arrival.iataCode,
        departure: flight.departure.scheduledTime,
        arrival: flight.arrival.scheduledTime,
      })

      const random = Math.random() * (7 - 2) + 2
      const newDeparture = data.departure.setDate(data.departure.getDate() + random)
      const newArrival = data.arrival.setDate(data.arrival.getDate() + random)
      await Flight.update({ departure: newDeparture, arrival: newArrival }, { where: { id: data.id } })
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = createFlight;
