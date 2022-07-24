const _ = require('underscore');
const asyncHandler = require('express-async-handler');
const Bug = require('../../models/bugModel');

// @desc    Update bug data
// @route   PUT /bugs/:id
// @access  Private
// @channel bugs 
// @event   child_updated

const updateBug = asyncHandler(async (req, res) => {
    try {
        const bugUpdated = {
            ...req.body,
            description: JSON.stringify(req.body.description)
        }

        // TODO: Fix this when starting to implement real time functionality. This is spagetti code. Ugly code.
        if(req.body.timeWorked) {
            const currentBug = await Bug.findById(req.params.id);
            const fieldToUpdate = {timeWorked: _.uniq([req.body.timeWorked, ...currentBug.timeWorked], false, _.iteratee('startedAt'))};
            const bugUpdated = await Bug.findByIdAndUpdate(req.params.id, fieldToUpdate,
            { 
                new: true, 
                runValidators: true 
            });

            return res.status(200).json({
                status: 'ok',
                data: { bug: bugUpdated }
            });
        }

        const updatedBug = await Bug.findByIdAndUpdate(req.params.id, bugUpdated, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'ok',
            data: { bug: updatedBug }
        });
    } catch (error) {   
        res.status(401).json({
            status: 'fail',
            message: 'Could not update the bug'
        });
    }
})

module.exports = updateBug;