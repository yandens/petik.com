const jwt = require("jsonwebtoken");

function authorize(roles = []) {
  if (typeof roles === "string") {
    roles = [roles];
  }

  return [
    (req, res, next) => {
      try {
        const token = req.headers["authorization"].split(" ")[1];

        if (!token) {
          return res.status(401).json({
            status: false,
            message: "you're not authorized!",
            data: null,
          });
        }

        const user = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (roles.length > 0) {
          const valid = roles.find((r) => r == user.role);

          if (!valid) {
            return res.status(401).json({
              status: false,
              message: "you're not authorized!",
              data: null,
            });
          }
        }

        req.user = user;
        next();
      } catch (err) {
        if (err.message == "jwt malformed") {
          return res.status(401).json({
            status: false,
            message: "you're not authorized!",
            data: null,
          });
        }
        next(err);
      }
    },
  ];
}

module.exports = authorize;
