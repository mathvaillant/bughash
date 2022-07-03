const asyncHandler = require('express-async-handler');
const User = require('../../models/userModel');

const updateUserAvatar = asyncHandler(async (req, res) => {
    try {
        const newAvatar = req.file;

        await User.findByIdAndUpdate(req.params.id, { newAvatar }, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'ok',
            data: newAvatar
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: 'Failed to update user avatar'
        });
    }
});

module.exports = updateUserAvatar;