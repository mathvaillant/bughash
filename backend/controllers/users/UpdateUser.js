const asyncHandler = require('express-async-handler');
const User = require('../../models/userModel');

// @desc    Update user data
// @route   PUT /users/:id
// @access  Private
const updateUser = asyncHandler( async (req, res) => {
    try {
        console.log(req.body);
        const userUpdated = await User.findByIdAndUpdate(req.params.id, req.body);

        res.status(200).json({
            status: 'ok',
            data: { userUpdated }
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error
        })
    }
}) 

module.exports = updateUser;