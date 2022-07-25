const _ = require('underscore');
const asyncHandler = require('express-async-handler');
const Bug = require('../../models/bugModel');
const Pusher = require('../../utils/pusher');

// @desc    Update bug data
// @route   PUT /bugs/:id
// @access  Private
// @channel bugs 
// @event   child_updated

const updateBug = asyncHandler(async (req, res) => {
    try {
        let bugUpdated = null;

        // TODO: This should be splitted. 
        if(req.body.timeWorked) {
            const currentBug = await Bug.findById(req.params.id);
            const newTimeWorkedArr = {
                timeWorked: _.uniq([req.body.timeWorked, ...currentBug.timeWorked], false, _.iteratee('startedAt'))
            };

            bugUpdated = await Bug.findByIdAndUpdate(req.params.id, newTimeWorkedArr, { 
                new: true, 
                runValidators: true 
            });
        } else {
            bugUpdated = await Bug.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            });
        }

        const bugs = await Bug.find();

        Pusher.trigger("bugs", "child_updated", { bugs });

        return res.status(204).json({
            status: 'ok',
            message: 'Bug updated successfully'
        });
    } catch (error) {   
        res.status(401).json({
            status: 'fail',
            message: 'Could not update the bug'
        });
    }
})

module.exports = updateBug;