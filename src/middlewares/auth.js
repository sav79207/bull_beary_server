export  const authMiddleware = async (req, res, next) => {
    try {
        next()
    } catch (err) {
         res.sendStatus(401)
    }
}