require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const router = require("./routes");
const cookieParser = require("cookie-parser");
const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");
app.use(morgan("dev")); // for logging
app.use(express.json()); // read body type json
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(router);

app.use((req, res, next) => {
  return res.status(404).json({
    status: false,
    message: "Are you lost?",
  });
});

// 500 handler
app.use((err, req, res, next) => {
  console.log(err);
  return res.status(500).json({
    status: false,
    message: err.message,
  });
});

// const { HTTP_PORT } = process.env;
// app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`));
module.exports = app;
