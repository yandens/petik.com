const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const getPort = async (req, res, next) => {
  try {
    const { search } = req.params;

    const url = `https://port-api.com/port/code/${search}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "port-api.com",
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

module.exports = getPort;
