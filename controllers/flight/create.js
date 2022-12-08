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

    for (const flight of flights) {
      await Flight.create({
        airline: flight.airline.name,
        origin: flight.departure.iataCode,
        destination: flight.arrival.iataCode,
        departure: flight.departure.scheduledTime,
        arrival: flight.arrival.scheduledTime,
      })
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = createFlight;
