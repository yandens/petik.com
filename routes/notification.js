const router = require("express").Router();
const notification = require("../controllers/notification");
const authorize = require("../middlewares/authorize");

router.get("/", authorize(), notification.notification);

module.exports = router;
