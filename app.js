require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const router = require("./routes");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
const cron = require("node-cron");
const flight = require("./controllers/flight");

const app = express();

app.set("view engine", "ejs");
app.use(morgan("dev")); // for logging
app.use(express.json()); // read body type json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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

const { PORT, FE_LINK } = process.env;
const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

const io = require("socket.io")(server, {
  cors: {
    origin: FE_LINK,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  const { Notification } = require("./models");
  socket.on("LOAD_NOTIFICATIONS", async (userID) => {
    const notifUser = await Notification.findAll({
      where: { user_id: userID },
    });

    io.emit(`NOTIFICATIONS-${userID}`, notifUser);
  });

  socket.on(`READ_ALL`, async (userID) => {
    await Notification.update({ isRead: true }, { where: { user_id: userID } });
    const notifUser = await Notification.findAll({
      where: { user_id: userID },
    });
    io.emit(`NOTIFICATIONS-${userID}`, notifUser);
  });
});

// delete flight
cron.schedule("59 23 * * 6", () => {
  flight.deleteFlight.deleteFlight();
});

// create flight
cron.schedule("0 0 * * 0", () => {
  flight.createFlight.createFlight();
});

module.exports = app;
