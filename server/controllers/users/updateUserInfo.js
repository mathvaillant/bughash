const asyncHandler = require('express-async-handler');
const User = require('../../models/userModel');
const pusher = require("../../utils/pusher");

// @desc    Update user data
// @route   PUT /users/:id
// @access  Private
const updateUserInfo = asyncHandler( async (req, res) => {
    try {
        const userUpdated = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        }).select('-password');

        pusher.trigger('users', 'child_updated', userUpdated);

        return res.status(200).json({
            status: 'ok',
            message: 'User updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error
        })
    }
}) 

module.exports = updateUserInfo;