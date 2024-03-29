const asyncHandler = require('express-async-handler');
const Bug = require('../../models/bugModel');
const Pusher = require('../../utils/pusher');

// @desc    Create new bug
// @route   POST /bugs
// @access  Private 
// @channel bugs 
// @event   child_added
const createBug = asyncHandler(async (req, res) => {
    try {
        const { title, status, description, files } = req.body;

        const newBug = await Bug.create({ 
            title,
            status,
            description,
            createdBy: req.user.id,
            files
        });

        Pusher.trigger("bugs", "child_added", { bug: newBug });
        
        return res.status(201).json({
            status: 'ok',
            message: 'Bug created successfully',
            newBug
        });
    } catch (error) {
        res.status(401).json({
            status: 'fail',
            message: error
        })
    }
})

module.exports = createBug;