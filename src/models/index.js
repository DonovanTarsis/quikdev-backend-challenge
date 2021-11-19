const mongoose = require('../database/connection');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    birthdate:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    addressNumber:{
        type: String,
        required: true
    },
    primaryPhone:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: false
    },
    createdAt:{
        type: String,
        required: true
    }
})

const User = mongoose.model("users", UserSchema);

module.exports = User;