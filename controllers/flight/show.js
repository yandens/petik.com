const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const showFlight = async (req, res, next) => {
  try {
    const {
      access_key = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiMThjMWJiODNhZjg1NmMxNTA1MjIwY2Q2OWNhNjU2MWE1NjViNDQ5YjdiNjQ3ZjJhNmFkYWVhNGIwY2Y5NTY0MGY3NTA5NjNiNDdkOWQ1NzAiLCJpYXQiOjE2NzAyOTQyODQsIm5iZiI6MTY3MDI5NDI4NCwiZXhwIjoxNzAxODMwMjg0LCJzdWIiOiIxOTExOCIsInNjb3BlcyI6W119.cKuLO9G357-ExLVkvVt0QBoKYizZgg6JaK5bp3_nfSpHmttlghw0dwzm31uufhqqMW13QV0pFDgc1oy08jz09Q",
    } = req.query;
    const url = `https://app.goflightlabs.com/advanced-flights-schedules?access_key=${access_key}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "app.goflightlabs.com",
      },
    };
    const result = await fetch(url, options);
    const json = await result.json();

    return res.status(200).json({
      status: true,
      message: "Success Get All Data",
      data: json.data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = showFlight;
