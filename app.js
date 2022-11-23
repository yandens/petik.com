require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const router = require("./routes");
const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");
app.use(morgan("dev")); // for logging
app.use(express.json()); // read body type json
app.use(express.urlencoded({ extended: false }));

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

const { PORT } = process.env;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
// module.exports = app;
