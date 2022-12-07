const router = require("express").Router();
const show = require("../controllers/flight");
const create = require("../controllers/flight");
const authorize = require("../middlewares/authorize");
const role = require("../utils/role-based/role");

router.get("/schedule", show.showFlight);
router.post("/create-flight", authorize(role.admin), create.createFlight);

module.exports = router;
