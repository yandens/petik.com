require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const router = require("./routes");
const ejs = require('ejs')

const app = express();

app.set('view engine', 'ejs')
app.use(express.json()); // read body type json
app.use(morgan("dev")); // for logging
app.use(express.urlencoded({ extended: false }));

app.use(router);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    status: false,
    message: 'are u lost?'
  })
})

// 500 handler
app.use((err, req, res, next) => {
  //console.log(err)
  res.status(500).json({
    status: false,
    message: err.message
  })
})

const { HTTP_PORT } = process.env;
app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`));