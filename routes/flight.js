const router = require("express").Router();
const flight = require("../controllers/flight");

router.get("/schedule", flight.showFlight);

module.exports = router;
