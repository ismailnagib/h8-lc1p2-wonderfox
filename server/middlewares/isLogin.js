const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    jwt.verify(req.headers.access_token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
            next(err)
        } else {
            req.userId = decoded.id
            next()
        }
    }) 
}