const asyncHandler = require('express-async-handler');
const Bug = require('../../models/bugModel');
    
// @desc    Delete bug
// @route   DELETE /bugs/:id
// @access  Private
const deleteBug = asyncHandler(async (req, res) => {
    try {
        const bugToDelete = await Bug.findById(req.params.id);

        await bugToDelete.remove();

        res.status(204).json({
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