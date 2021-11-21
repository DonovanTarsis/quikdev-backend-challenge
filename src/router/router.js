const express = require('express');
const { login } = require('../controller/login');
const { 
    createUser, 
    patchUser, 
    setUserPassword, 
    requestUsersList 
} = require('../controller/users');
const { checkLogin } = require('../middleware/checkLogin');

const router = express();

router.post('/login', login);

router.post('/users', createUser);
router.patch('/users', checkLogin, patchUser);
router.patch('/users/password', checkLogin, setUserPassword);
router.get('/users', checkLogin, requestUsersList)

module.exports = router;