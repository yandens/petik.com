const { User, UserBiodata } = require('../../models');
const Validator = require('fastest-validator');
const v = new Validator();

const createUser = async (req, res, next) => {
    try {
        const user = req.user
        const {
            username,
            firstName,
            lastName,
            phoneNumber
        } = req.body;

        const schema = {
            username: { type: "string"},
            firstName: { type: "string"},
            lastName: { type: "string"},
            phoneNumber: { type: "string", min: 12}
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
                status:false,
                message: "Must be string / Phone Number at least 12 digit",
                data: null,
            });
        }

        const usernameExist = await User.findAll({where: {username }});
        if (usernameExist.length > 1){
            return res.status(400).json({
                status:false,
                message: "Username already exist",
                data:null
            });
        }

        await User.create(
            { username },
            { where: { id: user.id  }}
        )
        await UserBiodata.create(
            { firstName, lastName, phoneNumber},
            { where: { id: user.id  }}
        )

        return res.status(200).json({
            status: true,
            message: 'success',
            data: {
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber
            }
        });
    } catch (err) {
        next(err)
    }
}

module.exports = createUser