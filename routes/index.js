const router = require("express").Router();
const auth = require("./auth");
const user = require("./user");
const port = require("./port");

router.get("/", (req, res) => {
  return res.status(200).json({
    status: true,
    message: "success",
    data: null,
  });
});

router.use("/auth", auth);
router.use("/user", user);
router.use("/port", port);

module.exports = router;
