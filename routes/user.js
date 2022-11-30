const router = require("express").Router();
const authorize = require("../middlewares/authorize");
const user = require("../controllers/user");
const role = require("../utils/role-based/role")

router.put("/update-user", authorize(role.buyer), user.updateUser)
router.put("/delete-account", authorize(role.buyer), user.deleteAccount);
router.get("/get-users", authorize(role.admin), user.getAllUser);
router.get("/get-user", authorize(role.admin), user.getUser)

module.exports = router;
