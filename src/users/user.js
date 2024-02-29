const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        require: [true, 'firstName is required']
    },
    lastName: {
        type: String,
        require: [true, 'lastName is required']
    },
    userName: {
        type: String,
        lowercase: true,
        required: [true, 'userName is required']
    },
    email: {
        type: String,
        required: [true, 'emial is required']
    },
    password: {
        type: String,
        required: [true, 'password is required'],
    },
    state: {
        type: Boolean,
        default: true
    }
});

module.exports = model ('User', userSchema);