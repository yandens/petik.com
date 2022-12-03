const axios = require("axios");

const getPort = async (req, res, next) => {
  try {
    const { search } = req.params;

    const response = await axios.get(
      `https://port-api.com/port/search/${search}`
    );

    // const result = JSON.stringify(response);

    // return res.status(200).json({
    //   status: true,
    //   message: "Success Get Data",
    //   data: result,
    // });
    console.log(response);
  } catch (error) {
    next(error);
  }
};

module.exports = getPort;
