const asyncHandler = require('express-async-handler');
const Bug = require('../../models/bugModel');

// @desc    Create new bug
// @route   POST /bugs
// @access  Private 
const createBug = asyncHandler(async (req, res) => {
    if(!req.body.title) {
        res.status(400);
        throw new Error('Please send the bug with a title')
    }

    const { title, status, description, files } = req.body;

    const bug = await Bug.create({ 
        title,
        status,
        description: JSON.stringify(description),
        createdBy: req.user.id,
        files
    });
    
    res.status(200).json(bug);
})

module.exports = createBug;