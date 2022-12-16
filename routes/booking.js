const router = require("express").Router();
const booking = require("../controllers/booking");
const authorize = require("../middlewares/authorize");

router.post("/", authorize(), booking.booking);
router.put("/cancel", authorize(), booking.cancelBooking);
router.get("/list-booking", authorize(), booking.getAllBooking);

module.exports = router;
