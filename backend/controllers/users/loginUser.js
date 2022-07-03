const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../../models/userModel');
const generateToken = require("../../utils/jwt");

// @desc    Authenticate a user
// @route   POST /users/login
// @acess   Public
const loginUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body;
    
    // Check for user email
    const user = await User.findOne({email});

    if(user && password && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            token: generateToken(user._id)
        })
    } else {    
        res.status(400);
        throw new Error('Invalid email or password'); 
    }
});

module.exports = loginUser;