const { User } = require('../../models');
// const { Role } = require("../../models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = process.env;


const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
            const user = await User.findOne({ where: { email: email } });
            if (!user) {
                return res.status(400).json({
                    status: false,
                    message: 'email is not valid!',
                    data: null
                });
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return res.status(400).json({
                    status: false,
                    message: 'password is not valid!',
                    data: null
                });
            }

            const payload = {
                id: user.id,
                email: user.email
            };
            const token = jwt.sign(payload, JWT_SECRET_KEY);

            return res.status(200).json({
                status: true,
                message: 'login success!',
                data: { 
                    email,
                    token }
            });
    } catch (error) {
        next(error);
    }
};

module.exports =  login ;