const yup = require('yup')

const schemaSetPassword = yup.object().shape({
    currentPassword: yup.string().required('Current password is required'),
    newPassword: yup.string().strict().required('New password is required').min(8)
})

module.exports = schemaSetPassword;