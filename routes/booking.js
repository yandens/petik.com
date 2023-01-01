const router = require("express").Router();
const booking = require("../controllers/booking");
const authorize = require("../middlewares/authorize");
const role = require('../utils/role-based/role')

router.post("/", authorize(), booking.booking);
router.put("/cancel", authorize(), booking.cancelBooking);
router.get("/list-booking", authorize(), booking.getAllBooking);
router.get('/user-booking/:user_id', authorize(role.admin), booking.getTotalBooking)
router.get('/list-seat/:flight_id', authorize(), booking.listSeat)

module.exports = router;
