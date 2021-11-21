const User = require('../models/index');
const bcrypt = require('bcrypt')
const schemaRegisterUser = require('../validations/schemaRegisterUser');

const createUser = async (req, res) => {
    const {
        username,
        primaryPhone,
        password
    } = req.body;
    try {
        await schemaRegisterUser.validate(req.body);
        let formattedPhone = primaryPhone.toString();
        if(formattedPhone.length === 11){
            formattedPhone = `(${formattedPhone.substr(0, 2)}) ${formattedPhone.substr(2, 5)}-${formattedPhone.substr(7)}`
        } else if(formattedPhone.length === 10){
            formattedPhone = `(${formattedPhone.substr(0, 2)}) ${formattedPhone.substr(2, 4)}-${formattedPhone.substr(6)}`

        }else {
            return res.status(400).json({ message: 'The phone must have a min of 10 digits and a max of 11 digits.' });
        }
        const existingUser = await User.find({ $or: [{ username }, { primaryPhone }] }).select(['name', 'username', 'primaryPhone']);
        if (existingUser.length) {
            for (const item of existingUser) {
                if (item.username === username) {
                    return res.status(400).json({ message: 'Username is already in use' });
                } else if (item.primaryPhone === primaryPhone) {
                    return res.status(400).json({ message: 'Phone already registered.' });
                }
            }
        }
        const passwordHash = await bcrypt.hash(password, 10)
        const newUser = await new User({...req.body, primaryPhone: formattedPhone, password: passwordHash}).save();
        const { __v, password: _, ...response } = newUser._doc;
        res.status(201).json(response)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    createUser
}