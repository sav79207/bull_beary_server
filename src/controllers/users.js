const User = require("../models/User");
module.exports = {
    login: async (req, res, next) => {
        try {
            res.send({user: 'user login'})
        } catch (err) {
            next(err)
        }
    },

    getUser: async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await User.findOne({
                where: { tg_user_id: userId },
                include: {
                    model: User,
                    as: 'referral',
                    attributes: ['id', 'tg_user_id', 'first_name', 'refId']
                }
            });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

