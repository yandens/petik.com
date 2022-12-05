const router = require("express").Router();
const port = require("../controllers/port");
const authorize = require("../middlewares/authorize");

router.get("/search/:search", authorize(), port.getPort);

module.exports = router;
