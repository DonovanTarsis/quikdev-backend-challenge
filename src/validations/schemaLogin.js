const yup = require('yup')


const schemaLogin = yup.object().shape({
    username: yup.string().required('username is required'),
    password: yup.string().strict().required('password is required'),
})


module.exports = schemaLogin;