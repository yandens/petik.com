const { Flight } = require("../../models");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const { GOFLIGHTLABS_ACCESS_KEY } = process.env;

const createFlight = async () => {
  try {
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

    for (const flight of flights) {
      const departureDate = flight.departure.scheduledTime.split('T')[0]
      const departureTime = flight.departure.scheduledTime.split('T')[1].split('.')[0]
      const arrivalDate = flight.arrival.scheduledTime.split('T')[0]
      const arrivalTime = flight.arrival.scheduledTime.split('T')[1].split('.')[0]
      await Flight.create({
        airline: flight.airline.name,
        origin: flight.departure.iataCode,
        destination: flight.arrival.iataCode,
        departureDate,
        departureTime,
        arrivalDate,
        arrivalTime
      })
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = createFlight;
