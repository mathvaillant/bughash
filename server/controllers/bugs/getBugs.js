const asyncHandler = require('express-async-handler');
const Bug = require('../../models/bugModel');
const cors = require('cors')({ origin: true });

// @desc    Get list of bugs
// @route   GET /bugs
// @access  Private
const getBugs = asyncHandler(async (req, res) => {
    try {
        const bugs = await Bug.find(); 

        const onlyUserBugs = bugs.filter(bug => bug.createdBy.toString() === req.user.id);

        res.status(200).json({
            status: 'ok',
            data: {
                bugs: onlyUserBugs 
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: 'Could not find bugs'
        });
    }
})

module.exports = getBugs;