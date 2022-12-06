const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const showFlight = async (req, res, next) => {
  try {
    const { access_key = "47eb418d4a8ec479209f78b9d69c11f4" } = req.query;
    const url = `https://api.aviationstack.com/v1/flights?access_key=${access_key}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "api.aviationstack.com",
      },
    };
    const result = await fetch(url, options);
    const json = await result.json();

    return res.status(200).json({
      status: true,
      message: "Success Get Data",
      data: json,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = showFlight;
