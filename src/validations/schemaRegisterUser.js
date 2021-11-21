const yup = require('yup')


const schemaRegisterUser = yup.object().shape({
    name: yup.string().required('name is required'),
    username: yup.string().required('username is required'),
    birthdate: yup.number().strict().required('birthdate is required'),
    address: yup.string().required('address is required'),
    addressNumber: yup.number().required('addressNumber is required'),
    primaryPhone: yup.number().strict().required('primaryPhone is required'),
    description: yup.string(),
    password: yup.string().strict().required('password is required').min(8),
})


module.exports = schemaRegisterUser;