const router = require("express").Router();
const authorize = require("../middlewares/authorize");
const user = require("../controllers/user");
const role = require("../utils/role-based/role");
const mediaValidation = require("../utils/media/media-validation");

router.get("/show-bio", authorize(role.buyer), user.showBio);
router.post("/create-bio", authorize(role.buyer), user.createBio);
router.put("/update-bio", authorize(role.buyer), user.updateBio);
router.put("/delete-account", authorize(role.buyer), user.deleteAccount);
router.get("/get-users", authorize(role.admin), user.getAllUser);
router.get("/get-user", authorize(role.admin), user.getUser);

router.put(
  "/upload-avatar",
  authorize(role.buyer),
  mediaValidation.image.single("avatar"),
  user.uploadAvatar
);
router.put("/delete-avatar", authorize(role.buyer), user.deleteAvatar);

module.exports = router;
