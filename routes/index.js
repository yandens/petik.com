const router = require("express").Router();
const auth = require("./auth");

router.get('/', (req, res) => {
  return res.status(200).json({
    status: true,
    message: 'success',
    data: null
  })
});
router.use('/auth', auth)

module.exports = router;
