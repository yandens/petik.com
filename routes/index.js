const router = require("express").Router();
const auth = require("./auth");
const user = require("./user");
const port = require("./port");
const flight = require("./flight");
const booking = require("./booking");
const payment = require("./payment");
const ticket = require("./ticket");

router.get("/", (req, res) => {
  return res.status(200).json({
    status: true,
    message: "success",
    data: null,
  });
});

router.use("/auth", auth);
router.use("/user", user);
router.use("/airport", port);
router.use("/flight", flight);
router.use("/booking", booking);
router.use("/payment", payment);
router.use("/ticket", ticket);

module.exports = router;
