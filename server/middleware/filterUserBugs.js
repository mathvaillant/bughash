const asyncHandler = require('express-async-handler');
const Bug = require('../../models/bugModel');

const filterUserBugs = asyncHandler(async (req, res, next) => {
    const bugs = await Bug.find(); 

    const onlyUserBugs = bugs.filter(bug => bug.createdBy.toString() === req.user.id);

    req.onlyUserBugs = onlyUserBugs;

    next();
});

module.exports = filterUserBugs;