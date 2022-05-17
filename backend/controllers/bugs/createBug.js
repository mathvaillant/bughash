const asyncHandler = require('express-async-handler');
const Bug = require('../../models/bugModel');

// @desc    Create new bug
// @route   POST /bugs
// @access  Private 
const createBug = asyncHandler(async (req, res) => {
    const { title, status, description, fileUrls } = req.body;

    const bug = await Bug.create({ 
        title,
        status,
        description: JSON.stringify(description),
        createdBy: req.user.id,
        fileUrls
    });
    
    res.status(200).json(bug);
})

module.exports = createBug;