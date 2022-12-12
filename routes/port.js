const router = require("express").Router();
const port = require("../controllers/port");

router.get("/search/:search", port.getPort);

module.exports = router;
