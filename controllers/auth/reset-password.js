const { User } = require('../../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_SECRET_KEY } = process.env

const resetPassword = async (req, res, next) => {
  try {
    const { newPass, confirmNewPass } = req.body
    const { token } = req.query

    const validUser = jwt.verify(token, JWT_SECRET_KEY)

    if (!validUser) {
      return res.status(401).json({
        status: false,
        message: "Invalid token!",
      })
    }

    const findUser = await User.findOne({ where: { id: validUser.id } })

    if (newPass !== confirmNewPass) {
      return res.status(401).json({
        status: false,
        message: 'Password not match!',
      })
    }

    const encryptedPass = await bcrypt.hash(newPass, 10);

    await User.update(
      { password: encryptedPass },
      { where: { id: findUser.id } }
    )

    return res.status(201).json({
      status: true,
      message: "success change password",
      data: {
        id: findUser.id,
        username: findUser.email,
      }
    })
  } catch (err) {
    next(err)
  }
}
module.exports = resetPassword
