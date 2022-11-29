const router = require("express").Router();
const authorize = require("../middlewares/authorize");
const user = require("../controllers/user");

router.put("delete-account", user.deleteAccount);
router.get("get-users", user.getAllUser);

module.exports = router;
