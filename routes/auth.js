const router = require("express").Router();
const authorize = require("../middlewares/authorize");
const auth = require("../controllers/auth");

router.post("/register", auth.register);
router.get("/verify", auth.verifyEmail);
router.put("/change-password", authorize(), auth.changePassword);
router.post("/forgot-password", auth.forgotPassword);
router.put("/reset-password", auth.resetPassword);

module.exports = router;
