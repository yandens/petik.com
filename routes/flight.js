const router = require("express").Router();
const flight = require("../controllers/flight");

router.get("/schedule", flight.showFlight);
router.get("/schedule/search", flight.showFilter);

module.exports = router;
