const express = require('express');
const { login } = require('../controller/login');
const { createUser, patchUser, setUserPassword } = require('../controller/users');
const { checkLogin } = require('../middleware/checkLogin');

const router = express();

router.post('/users', createUser);
router.post('/login', login);
router.patch('/users', checkLogin, patchUser);
router.patch('/users/password', checkLogin, setUserPassword);

module.exports = router;