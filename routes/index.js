const router = require("express").Router();
const auth = require("./auth");

//router.post("/auth/register", auth.register);
// router.post("/auth/login", auth.login.login);
//router.put("/auth/change-password", auth.changePassword);
router.use('/auth', auth)

module.exports = router;
