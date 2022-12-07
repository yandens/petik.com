const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const { GOFLIGHTLABS_ACCESS_KEY } = process.env;

const searchAirport = async (iataCode) => {
  const url = `https://port-api.com/airport/iata/${iataCode}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "port-api.com",
    },
  };
  const result = await fetch(url, options);
  const json = await result.json();
  const airport = json.properties.name;
  return airport;
};

const showFlight = async (req, res, next) => {
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

    const flightSchedule = [];
    for (const flight of flights) {
      const schedule = {
        airline: flight.airline.name,
        departure: flight.departure.iataCode,
        arrival: flight.arrival.iataCode,
        departureTime: flight.departure.scheduledTime,
        arrivalTime: flight.arrival.scheduledTime,
      };

      flightSchedule.push(schedule);
    }
    return res.status(200).json({
      status: true,
      message: "Success Get All Data",
      data: flightSchedule,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = showFlight;
