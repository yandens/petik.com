const { Flight } = require("../../models");

const updateFlight = async (req, res, next) => {
  try {
    const { flight_id } = req.params;
    const { airline, origin, destination, departure, arrival } = req.body;

    let airlineLogo
    if (airline == 'Garuda Indonesia') {
      airlineLogo = 'http://bit.ly/3Ytqr3w'
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

    const updated = await Flight.update(
      { airline, origin, destination, departure, arrival, airline_logo: airlineLogo },
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
