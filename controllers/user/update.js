const { User, UserBiodata } = require("../../models");
const Validator = require("fastest-validator");
const v = new Validator();

const updateUser = async (req, res, next) => {
  try {
    const user = req.user
    const {
      username,
      firstName,
      lastName,
      phoneNumber
    } = req.body;

    const schema = {
      username: { type: "string" },
      firstName: { type: "string" },
      lastName: { type: "string" },
      phoneNumber: { type: "string", min: 12 }
    };
    const check = await v.compile(schema);

    const validate = check({
      username: `${username}`,
      firstName: `${firstName}`,
      lastName: `${lastName}`,
      phoneNumber: `${phoneNumber}`
    });

    if (validate.length > 0) {
      return res.status(400).json({
        status: false,
        message: "Must be String / Phone Number at least 12 digit",
        data: null,
      });
    }

    const usernameExist = await User.findAll({ where: { username } })
    if (usernameExist.length > 1) {
      return res.status(400).json({
        status: false,
        message: "Username already exist!",
        data: null
      })
    }

    await User.update(
      { username },
      { where: { id: user.id } }
    )
    await UserBiodata.update(
      { firstName, lastName, phoneNumber },
      { where: { user_id: user.id } }
    )

    return res.status(201).json({
      status: true,
      message: "Success update user!",
      data: {
        id: user.id,
        email: user.email
      }
    })
  } catch (err) {
    next(err)
  }
}

module.exports = updateUser
