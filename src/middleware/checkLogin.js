const User = require('../models/index');
const jwt = require('jsonwebtoken')

async function checkLogin(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: "Token not entered." });
    }

    try {
        const token = authorization.replace('Bearer', '').trim();
        const { id } = jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findById(id);
        if (user === null) {
            return res.status(401).json({ message: "User logged in not found." });
        }
        req.user = user;
        return next();
    } catch (error) {
        if (error.message === 'invalid token') {
            return res.status(400).json({ message: 'To access this feature a valid authentication token must be sent.' });
        }
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    checkLogin
}
    