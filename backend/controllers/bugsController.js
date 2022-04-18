const asyncHandler = require('express-async-handler');
const Bug = require('../models/bugModel');

// @desc    Get list of bugs
// @route   GET /bugs
// @access  Private
const getBugs = asyncHandler(async (req, res) => {
    const bugs = await Bug.find(); 
    
    res.status(200).json(bugs)
})

// @desc    Create new bug
// @route   POST /bugs
// @access  Private 
const createBug = asyncHandler(async (req, res) => {
    if(!req.body.title) {
        res.status(400);
        throw new Error('Please send the bug with a title')
    }

    const { title, status } = req.body;

    const bug = await Bug.create({ title, status });
    
    res.status(200).json(bug) 
})

// @desc    Update bug data
// @route   PUT /bugs/:id
// @access  Private
const updateBug = asyncHandler(async (req, res) => {
    const goal = await Bug.findById(req.params.id);

    if(!goal) {
        res.status(400);
        throw new Error('Bug not found');
    }

    const updatedBug = await Bug.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json(updatedBug);
})
    
// @desc    Delete bug
// @route   DELETE /bugs/:id
// @access  Private
const deleteBug = asyncHandler(async (req, res) => {
    const bugToDelete = await Bug.findById(req.params.id);

    if(!bugToDelete) {
        res.status(400);
        throw new Error('Could not find bug');
    };

    await bugToDelete.remove();

    res.status(200).json({message: `Delete bug with ${req.params.id} ID`});
})  

module.exports = { getBugs, createBug, updateBug, deleteBug };