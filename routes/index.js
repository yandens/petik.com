const router = require("express").Router();
const auth = require("./auth");
const user = require("./user");

router.get("/", (req, res) => {
  return res.status(200).json({
    status: true,
    message: "success",
    data: null,
  });
});

router.use("/auth", auth);
router.use("/user", user);

module.exports = router;
