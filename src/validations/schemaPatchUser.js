const yup = require('yup')

const schemaPatchUser = yup.object().shape({
    name: yup.string(),
    username: yup.string(),
    birthdate: yup.number().strict(),
    address: yup.string(),
    addressNumber: yup.number(),
    primaryPhone: yup.number().strict(),
    description: yup.string(),
})

module.exports = schemaPatchUser;