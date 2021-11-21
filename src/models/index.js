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
        type: Number,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    addressNumber:{
        type: Number,
        required: true
    },
    primaryPhone:{
        type: String,
        required: true
    },
    description:{
        type: String,
        default: "Hi, I'm in the quikDev database!"
    },
    createdAt:{
        type: String, 
        default: +Date.now()
    },
    password:{
        type: String,
        required: true
    }
})

const User = mongoose.model("users", UserSchema);

module.exports = User;