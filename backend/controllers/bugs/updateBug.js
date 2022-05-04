const asyncHandler = require('express-async-handler');
const Bug = require('../../models/bugModel');

// @desc    Update bug data
// @route   PUT /bugs/:id
// @access  Private
const updateBug = asyncHandler(async (req, res) => {
    try {
        const bug = await Bug.findById(req.params.id);

        if(!bug) {
            res.status(400);
            throw new Error('Bug not found');
        }

        // Check for user
        if(!req.user) {
            res.status(401);
            throw new Error('User not found');
        }

        // Check if token gives permissions to the action
        if(bug.createdBy.toString() !== req.user.id) {
            res.status(401);
            throw new Error('You do not have permissions for this action');
        }

        const bugUpdated = {
            ...req.body,
            description: JSON.stringify(req.body.description)
        }

        const updatedBug = await Bug.findByIdAndUpdate(req.params.id, bugUpdated, { new: true });

        res.status(200).json(updatedBug);
    } catch (error) {   
        res.status(401).json(error.message);
    }

})

module.exports = updateBug;