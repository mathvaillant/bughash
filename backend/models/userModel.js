const mongoose = require('mongoose');

const Avatar = mongoose.Schema({
    url: String,
    ref: String
});

const userSchema = mongoose.Schema({ 
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        selected: false
    },
    role: {
        type: String,
        required: false
    },
    avatar: {
        type: Avatar,
        required: false
    }
}, {
    timestamps: true 
})

module.exports = mongoose.model('User', userSchema);

