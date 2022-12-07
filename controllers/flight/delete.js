const { Flight } = require('../../models');

const deleteFlight = async () => {
  try {
    await Flight.destroy({ truncate: true, restartIdentity: true });
  } catch (err) {
    console.log(err)
  }
}

module.exports = deleteFlight;
