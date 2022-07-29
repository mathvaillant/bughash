const asyncHandler = require('express-async-handler');
const Bug = require('../../models/bugModel');
const Pusher = require('../../utils/pusher');
    
// @desc    Delete bug
// @route   DELETE /bugs/:id
// @access  Private
// @channel bugs 
// @event   child_deleted
const deleteBug = asyncHandler(async (req, res) => {
    try {
        const bugToDelete = await Bug.findById(req.params.id);

        await bugToDelete.remove();

        Pusher.trigger("bugs", "child_deleted", { bug: null });

        return res.status(200).json({
            status: 'ok',
            message: 'Successfully deleted!'
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: 'Could not delete the bug'
        })
    }
})  

module.exports = deleteBug;