const whoami = (req, res, next) => {
  try {
    const user = req.user;
    return res.status(200).json({
      status: true,
      message: "Success",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = whoami;
