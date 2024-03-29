const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
    let token = null;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token and append to the request
            req.user = await User.findById(decoded.id).select('-password') // does not return the hashedPassword from the decoded token

            if(!req.user) {
                throw new Error('User does not exist!');
            }
            
            req.test = 'batata'
            next();
        } catch (error) {
            res.status(401);
            throw new Error('Not authorized');
        }
    }

    if(!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    };
})

module.exports = {
    protect
}