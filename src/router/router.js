const express = require('express');
const { login } = require('../controller/login');
const { createUser, patchUser } = require('../controller/users');
const { checkLogin } = require('../middleware/checkLogin');

const router = express();

router.post('/users', createUser);
router.post('/login', login);
router.patch('/users', checkLogin, patchUser);

module.exports = router;