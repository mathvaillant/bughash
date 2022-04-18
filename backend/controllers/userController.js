const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel')


// @desc    Register new user
// @route   POST /users
// @acess   Public
const registerUser = (req, res) => {
    res.json({ message: 'Register user' })
}

// @desc    Authenticate a user
// @route   POST /users/login
// @acess   Public
const loginUser = (req, res) => {
    res.json({ message: 'Login user'})
}

// @desc    Get user data
// @route   GET /users/profile
// @acess   Private
const getProfile = (req, res) => {
    res.json({ message: 'User data displayed' })
}

module.exports = {
    registerUser,
    loginUser,
    getProfile  
}