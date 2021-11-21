const User = require('../models/index');
const bcrypt = require('bcrypt')
const schemaRegisterUser = require('../validations/schemaRegisterUser');
const schemaPatchUser = require('../validations/schemaPatchUser');
const schemaSetPassword = require('../validations/schemaSetPassword');
const formatPhone = require('../utils/formatPhone');

const createUser = async (req, res) => {
    const {
        username,
        primaryPhone,
        password
    } = req.body;
    try {
        await schemaRegisterUser.validate(req.body);
        const formattedPhone = formatPhone(primaryPhone)
        if(formattedPhone.error){
            return res.status(400).json({ message: formattedPhone.error });
        }
        const existingUser = await User.find({ $or: [{ username }, { primaryPhone: formattedPhone }] }).select(['name', 'username', 'primaryPhone']);
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
        const newUser = await new User({ ...req.body, primaryPhone: formattedPhone, password: passwordHash }).save();
        const { __v, password: _, ...response } = newUser._doc;
        res.status(201).json(response)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const patchUser = async (req, res) => {
    const {
        name,
        username,
        birthdate,
        address,
        addressNumber,
        primaryPhone,
        description
    } = req.body;
    try {
        await schemaPatchUser.validate(req.body);
        const formattedPhone = formatPhone(primaryPhone)
        if(formattedPhone && formattedPhone.error){
            return res.status(400).json({ message: formattedPhone.error });
        }
        const existingUser = await User.find({ _id: { $ne: req.user._id }, $or: [{ username }, { primaryPhone }] }).select();
        if (existingUser.length) {
            for (const item of existingUser) {
                if (item.username === username) {
                    return res.status(400).json({ message: 'Username is already in use' });
                } else if (item.primaryPhone === primaryPhone) {
                    return res.status(400).json({ message: 'Phone already registered.' });
                }
            }
        }
        const userUpdate = {
            ...req.user._doc,
            name: name ?? req.user.name,
            username: username ?? req.user.username,
            birthdate: birthdate ?? req.user.birthdate,
            address: address ?? req.user.address,
            addressNumber: addressNumber ?? req.user.addressNumber,
            primaryPhone: formattedPhone ?? req.user.primaryPhone,
            description: description ?? req.user.description,
        };
        const update = await User.findByIdAndUpdate({ _id: req.user._id }, userUpdate)
        if (!update) {
            return res.status(500).json({ message: "jogo não atualizado" })
        }
        const { __v, password: _, ...response } = userUpdate;
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


const setUserPassword = async (req, res) => {
    const {
        currentPassword,
        newPassword
    } = req.body;
    try {
        await schemaSetPassword.validate(req.body);
        const passwordVerified = await bcrypt.compare(currentPassword, req.user.password);

        if (!passwordVerified) {
            return res.status(401).json({ message: "Incorrect Password" });
        }
        const passwordHash = await bcrypt.hash(newPassword, 10)
        const userUpdate = {
            ...req.user._doc,
            password: passwordHash
        };
        const update = await User.findByIdAndUpdate({ _id: req.user._id }, userUpdate)
        if (!update) {
            return res.status(500).json({ message: "jogo não atualizado" })
        }
        const { __v, password: _, ...response } = userUpdate;
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const requestUsersList = async (req, res) => {
    try {
        const list = await User.find().select("name username birthdate address addressNumber primaryPhone description createdAt")
        if (!list) {
            return res.status(500).json({ message: "jogo não atualizado" })
        }
        res.status(200).json(list)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    createUser,
    patchUser,
    setUserPassword,
    requestUsersList
}