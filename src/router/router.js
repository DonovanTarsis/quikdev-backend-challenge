const express = require('express');
const { login } = require('../controller/login');
const { 
    createUser, 
    patchUser, 
    setUserPassword, 
    requestUsersList,
    requestUserById,
    requestCurrentUser,
    deleteUser
} = require('../controller/users');
const { checkLogin } = require('../middleware/checkLogin');

const router = express();

router.post('/login', login);

router.post('/users', createUser);
router.patch('/users', checkLogin, patchUser);
router.patch('/users/password', checkLogin, setUserPassword);
router.get('/users', checkLogin, requestUsersList)
router.get('/profile', checkLogin, requestCurrentUser)
router.get('/users/:id', checkLogin, requestUserById)
router.delete('/users', checkLogin, deleteUser)

module.exports = router;