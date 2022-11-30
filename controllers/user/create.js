const { User, UserBiodata } = require('../../models');
const Validator = require('fastest-validator');
const v = new Validator();

const createBio = async (req, res, next) => {
  try {
    const user = req.user
    const {
      firstName,
      lastName,
      phoneNumber
    } = req.body;

    const schema = {
      firstName: { type: "string" },
      lastName: { type: "string" },
      phoneNumber: { type: "string", min: 12 }
    };
    const check = await v.compile(schema);

    const validate = check({
      firstName: `${firstName}`,
      lastName: `${lastName}`,
      phoneNumber: `${phoneNumber}`
    });

    if (validate.length > 0) {
      return res.status(400).json({
        status: false,
        message: "Must be string / Phone Number at least 12 digit",
        data: null,
      });
    }

    await UserBiodata.create({
      firstName, lastName, phoneNumber
    });

    return res.status(200).json({
      status: true,
      message: 'success',
      data: {
        id: user.id,
        email: user.email
      }
    });
  } catch (err) {
    next(err)
  }
}

module.exports = createBio
