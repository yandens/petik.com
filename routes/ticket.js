const router = require("express").Router();
const printTicket = require("../controllers/ticket");
const authorize = require("../middlewares/authorize");

router.get("/print-ticket/:id", authorize(), printTicket.printTicket);

module.exports = router;
