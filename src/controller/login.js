const jwt = require('jsonwebtoken')
const User = require('../models/index');
const bcrypt = require('bcrypt');
const schemaLogin = require('../validations/schemaLogin');

async function login(req, res) {
    const { username, password } = req.body;

    try {
        await schemaLogin.validate(req.body)
        const user = await User.findOne().where('username').equals(username).select();
        if (user === null) {
            return res.status(401).json({ message: "Incorrect email or password" });
        }
        const passwordVerified = await bcrypt.compare(password, user.password);

        if (!passwordVerified) {
            return res.status(401).json({ message: "Incorrect email or password" });
        }

        const token = jwt.sign({
            id: user._id,
            username: user.username
        }, process.env.JWT_KEY, {
            expiresIn: "8h"
        })
        res.status(200).json({token})
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

module.exports = {
    login
}