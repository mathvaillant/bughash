const asyncHandler = require('express-async-handler');
const Bug = require('../../models/bugModel');

// @desc    Get list of bugs
// @route   GET /bugs
// @access  Private
const getBugs = asyncHandler(async (req, res) => {
    try {
        const bugs = await Bug.find(); 

        res.status(200).json({
            status: 'ok',
            data: {bugs}
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: 'Could not find bugs'
        })
    }
})

module.exports = getBugs;