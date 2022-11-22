const router = require("express").Router();
const auth = require("./auth");

router.post("/auth/register", auth.register.register);
// router.put("/auth/change-password", auth.changePassword);

module.exports = router;
