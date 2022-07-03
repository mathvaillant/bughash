const asyncHandler = require('express-async-handler');
const Bug = require('../../models/bugModel');

// @desc    Create new bug
// @route   POST /bugs
// @access  Private 
const createBug = asyncHandler(async (req, res) => {
    try {
        const { title, status, description, files } = req.body;

        const bug = await Bug.create({ 
            title,
            status,
            description: JSON.stringify(description),
            createdBy: req.user.id,
            files
        });
        
        res.status(201).json({
            status: 'ok',
            data: { bug } 
        });
    } catch (error) {
        res.status(401).json({
            status: 'fail',
            message: 'Could not create the bug'
        })
    }
})

module.exports = createBug;