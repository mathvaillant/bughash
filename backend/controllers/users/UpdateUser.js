const asyncHandler = require('express-async-handler');
const User = require('../../models/userModel');

// @desc    Update user data
// @route   PUT /users/:id
// @access  Private
const updateUser = asyncHandler( async (req, res) => {
    try {
        const { name, email } = req.body;

        if(!name | !email) {
            res.status(400);
            throw new Error('Name and Email are required!');
        }

        const userUpdated = { name, email };
        const data = await User.findByIdAndUpdate(req.params.id, userUpdated);

        if(!data) {
            res.status(400);
            throw new Error('Cannot update data');
        }

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