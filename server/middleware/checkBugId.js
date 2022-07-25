const Bug = require('../models/bugModel');

const checkBugId = (req, res, next) => {
    try {
        const bug = Bug.findById(req.params.id);

        if(!bug) {
            throw new Error('Bug does not exist');
        }

        next();
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error,
        })
    }
}

exports.checkBugId = checkBugId;