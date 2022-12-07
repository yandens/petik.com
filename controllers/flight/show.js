const { Flight } = require('../../models')
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
    const allFlight = await Flight.findAll()
    return res.status(200).json({
      status: true,
      message: "Success Get All Data",
      data: allFlight,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = showFlight;
