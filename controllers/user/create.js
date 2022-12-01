const { User, UserBiodata } = require('../../models');
const Validator = require('fastest-validator');
const v = new Validator({
  useNewCustomCheckerFunction: true, // using new version
  messages: {
    // Register our new error message text
    phoneNumber: "The phone number must be started with '+'!"
  }
});

const createBio = async (req, res, next) => {
  try {
    const user = req.user
    const {
      firstName,
      lastName,
      gender,
      phoneNumber,
      address,
      nationality
    } = req.body;

    const schema = {
      firstName: { type: "string" },
      lastName: { type: "string" },
      gender: { type: "string" },
      phoneNumber: {
        type: "string", min: 12, custom: (v, err) => {
          if (!v.startsWith("+")) err.push({ type: "phoneNumber" })
          return v.replace(/[^\d+]/g, ""); // Sanitize: remove all special chars except numbers
        }
      },
      address: { type: "string" },
      nationality: { type: "string" },
    };
    const check = await v.compile(schema);

    const validate = check({
      firstName: `${firstName}`,
      lastName: `${lastName}`,
      gender: `${gender}`,
      phoneNumber: `${phoneNumber}`,
      address: `${address}`,
      nationality: `${nationality}`,
    });

    if (validate.length > 0) {
      return res.status(400).json({
        status: false,
        message: "Must be string / The phone number must be started with '+'!",
        data: null,
      });
    }

    await UserBiodata.create({
      user_id: user.id, firstName, lastName, gender, phoneNumber, address, nationality
    });

    return res.status(201).json({
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
