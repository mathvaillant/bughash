const asyncHandler = require('express-async-handler');
const Bug = require('../../models/bugModel');

// @desc    Get single bug by id
// @route   GET /bugs/:id
// @access  Private
const getSingleBug = asyncHandler(async (req, res) => {
    try {
        const bug = await Bug.findById(req.params.id);

        res.status(200).json({
            status: 'ok',
            data: {bug}
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: 'Could not find bug'
        })
    }
});

module.exports = getSingleBug;