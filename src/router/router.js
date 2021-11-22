const express = require('express');
const { login } = require('../controller/login');
const { requestProfileCurrentUser } = require('../controller/profile');
const { 
    createUser, 
    patchUser, 
    setUserPassword, 
    requestUsersList,
    requestUserById,
    deleteUser
} = require('../controller/users');
const { checkLogin } = require('../middleware/checkLogin');
const swaggerUi = require('swagger-ui-express')

const router = express();

router.get('/users', checkLogin, requestUsersList)
router.get('/users/:id', checkLogin, requestUserById)
router.post('/users', createUser);
router.patch('/users', checkLogin, patchUser);
router.patch('/users/password', checkLogin, setUserPassword);
router.delete('/users', checkLogin, deleteUser)

router.post('/login', login);

router.get('/profile', checkLogin, requestProfileCurrentUser)

router.use('/docs', swaggerUi.serve, swaggerUi.setup(require('../../swagger.json')))

module.exports = router;