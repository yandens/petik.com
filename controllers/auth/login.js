const e = require('express');
const { User } = require('../../models');
const { Role } = require("../../models");

const login = async (req, res, next) => {
    try {
        const user = await User.authenticate(req.body);
        const accesstoken = user.generateToken();

        res.status(200).json({
            status: true,
            message: 'success login',
            data: {
                id: user.id,
                email: user.email,
                access_token: accesstoken,
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { login };