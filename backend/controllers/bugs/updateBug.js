const asyncHandler = require('express-async-handler');
const Bug = require('../../models/bugModel');

// @desc    Update bug data
// @route   PUT /bugs/:id
// @access  Private
const updateBug = asyncHandler(async (req, res) => {
    try {
        const bugUpdated = {
            ...req.body,
            description: JSON.stringify(req.body.description)
        }

        const updatedBug = await Bug.findByIdAndUpdate(req.params.id, bugUpdated, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'ok',
            data: { bug: updatedBug }
        });
    } catch (error) {   
        res.status(401).json({
            status: 'fail',
            message: 'Could not update the bug'
        });
    }
})

module.exports = updateBug;