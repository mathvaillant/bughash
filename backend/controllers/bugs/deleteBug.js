const asyncHandler = require('express-async-handler');
const Bug = require('../../models/bugModel');
    
// @desc    Delete bug
// @route   DELETE /bugs/:id
// @access  Private
const deleteBug = asyncHandler(async (req, res) => {
    const bugToDelete = await Bug.findById(req.params.id);

    if(!bugToDelete) {
        res.status(400);
        throw new Error('Could not find bug');
    };

    // Check for user
    if(!req.user) {
        res.status(401);
        throw new Error('User not found');
    }

    // Check if token gives permissions to the action
    if(bugToDelete.createdBy.toString() !== req.user.id) {
        res.status(401);
        throw new Error('You do not have permissions for this action');
    }

    await bugToDelete.remove();

    res.status(200).json({message: 'Successfully deleted!'});
})  

module.exports = deleteBug;