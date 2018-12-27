const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        // perform other checks...

        req.userData = decoded;

        next();
    } catch (error) {
        var noAuthorizationValue = "Cannot read property 'split' of undefined";
        return res.status(401).json({
            message: error.message === noAuthorizationValue ? 'Unable to verify' : error.message
        });
    }
};