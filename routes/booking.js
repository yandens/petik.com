const router = require("express").Router();
const booking = require("../controllers/booking");
const authorize = require("../middlewares/authorize");

router.post("/:flight_id", authorize(), booking.booking);
router.put("/:id", authorize(), booking.cancelBooking);
router.get("/list-booking", authorize(), booking.getAllBooking);

module.exports = router;
