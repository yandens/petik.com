const { Airport } = require('../../models')
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const { Op } = require('sequelize')

const getPort = async (req, res, next) => {
  try {
    const { search } = req.params;

    /*const url = `https://port-api.com/airport/search/${search}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "port-api.com",
      },
    };
    const result = await fetch(url, options);
    const json = await result.json();*/
    const filterAirport = await Airport.findAll({
      where: {
        [Op.or]: [{ name: search }, { iata_code: search }, { city: search }, { country: search }]
      }
    })

    return res.status(200).json({
      status: true,
      message: "Success Get Data",
      data: /*json */filterAirport,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getPort;
