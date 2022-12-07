const router = require("express").Router();
const flight = require("../controllers/flight");
const authorize = require("../middlewares/authorize");
const role = require("../utils/role-based/role");

router.get("/schedule", flight.showFlight);
router.post("/create-flight", authorize(role.admin), flight.createFlight);
router.put("/update-flight/:id", authorize(role.admin), flight.updateFlight);
router.delete("/delete-flight/:id", authorize(role.admin), flight.deleteFlight)

module.exports = router;
