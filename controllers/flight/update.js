const { Flight } = require("../../models");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const getAirport = async (iata) => {
  //const url = `https://port-api.com/airport/iata/${iata}`;
  const url = `https://api.aviowiki.com/free/airports/iata/${iata}`;
  const options = {
    method: "GET",
    headers: {
      //"X-RapidAPI-Host": "port-api.com",
      "X-RapidAPI-Host": "docs.aviowiki.com",
    },
  };
  const result = await fetch(url, options);
  const json = await result.json();
  return json
}

const updateFlight = async (req, res, next) => {
  try {
    const { flight_id } = req.params;
    const { airline, origin, destination, departure, arrival } = req.body;

    let airlineLogo
    if (airline == 'Garuda Indonesia') {
      airlineLogo = 'https://bit.ly/3BOGwXN'
    } else if (airline == 'Wings Air (Indonesia)') {
      airlineLogo = 'http://bit.ly/3G4OO0p'
    } else if (airline == 'Batik Air') {
      airlineLogo = 'http://bit.ly/3Ytqr3w'
    } else if (airline == 'Lion Air') {
      airlineLogo = 'https://bit.ly/3WbvdBj'
    } else if (airline == 'Citilink') {
      airlineLogo = 'https://bit.ly/3v6DYAJ'
    } else if (airline == 'AirAsia') {
      airlineLogo = 'https://bit.ly/3PF90Jm'
    } else {
      airlineLogo = 'https://bit.ly/3FDlHzT'
    }

    const originCity = await getAirport(origin)
    const destinationCity = await getAirport(destination)
    const updated = await Flight.update(
      { airline, origin, origin_city: originCity.servedCity, destination, destination_city: destinationCity.servedCity, departure, arrival, airline_logo: airlineLogo },
      { where: { id: flight_id } }
    );

    return res.status(200).json({
      status: true,
      message: "Data Updated!",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateFlight;
