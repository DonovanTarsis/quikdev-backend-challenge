const express = require('express');
const { login } = require('../controller/login');
const { createUser } = require('../controller/users');

const router = express();

router.post('/users', createUser);
router.post('/login', login);

module.exports = router;