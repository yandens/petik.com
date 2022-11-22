const router = require("express").Router();
const auth = require("./auth");

// router.post("/auth/register", auth.register);
// router.put("/auth/change-password", auth.changePassword);
router.use("/auth", auth);

module.exports = router;
