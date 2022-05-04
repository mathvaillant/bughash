const asyncHandler = require('express-async-handler');
const Bug = require('../../models/bugModel');

// @desc    Get single bug by id
// @route   GET /bugs/:id
// @access  Private
const getSingleBug = asyncHandler(async (req, res) => {
    const bug = await Bug.findById(req.params.id);

    res.status(200).json(bug)
});

module.exports = getSingleBug;