const jwt = require('jsonwebtoken')

const verifyJwt = async (req, res, next) => {
    if (req.headers && req.headers.authorization) {
        var authorization = req.headers.authorization,
            decoded;
        try {
            decoded = jwt.verify(authorization, process.env.JWT_SECRET_KEY);
            req.user = decoded;

            next();
        } catch (error) {
            return res.status(401).json({ "Error": "UnAuthorized", "Message": error, "ErrorCode": 308 })
        }
    } else {
        return res.status(401).json({ "Error": "UnAuthorized", "Message": "error", "ErrorCode": 308 })
    }
}

module.exports = { verifyJwt }