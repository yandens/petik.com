require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const router = require("./routes");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json()); // untuk membaca body tipe json

app.use(morgan("dev")); // untuk logging
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", router);

// const { HTTP_PORT } = process.env;
// app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`));
module.exports = app;
