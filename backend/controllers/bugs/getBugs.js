const asyncHandler = require('express-async-handler');
const Bug = require('../../models/bugModel');

// @desc    Get list of bugs
// @route   GET /bugs
// @access  Private
const getBugs = asyncHandler(async (req, res) => {
    const bugs = await Bug.find(); 
    res.status(200).json(bugs)
})

module.exports = getBugs;