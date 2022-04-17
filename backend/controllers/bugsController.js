const asyncHandler = require('express-async-handler');

// @desc    Get list of bugs
// @route   GET /bugs
// @access  Private
const getBugs = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'Get bugs'})
})

// @desc    Create new bug
// @route   POST /bugs
// @access  Private 
const createBug = asyncHandler(async (req, res) => {
    if(!req.body.text) {
        res.status(400);
        throw new Error('Please send a text')
    }
    res.status(200)
})

// @desc    Update bug data
// @route   PUT /bugs/:id
// @access  Private
const updateBug = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Updated bug with ${req.params.id} ID`});
})
    
// @desc    Delete bug
// @route   DELETE /bugs/:id
// @access  Private
const deleteBug = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Delete bug with ${req.params.id} ID`});
})

module.exports = { getBugs, createBug, updateBug, deleteBug };