module.exports = {
    login: async (req, res, next) => {
        try {
            res.send({user: 'user login'})
        } catch (err) {
            next(err)
        }
    }
}

