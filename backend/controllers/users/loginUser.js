const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../../models/userModel');
const generateToken = require("../../utils/jwt");

// @desc    Authenticate a user
// @route   POST /users/login
// @acess   Public
const loginUser = asyncHandler(async(req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({email});

        if(user && password && (await bcrypt.compare(password, user.password))) {
            return res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
                avatarUrl: user.avatarUrl
            })
        } else {    
            throw new Error('Invalid email or password'); 
        }
    } catch (error) {
        res.status((401)).json({
            status: 'fail',
            message: error || 'Not authorized'
        })
    }
});

module.exports = loginUser;