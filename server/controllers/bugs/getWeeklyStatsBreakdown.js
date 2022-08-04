const asyncHandler = require('express-async-handler');
const Bugs = require('../../models/bugModel');
const { mapBreakDownByStatus, mapBreakDownByTimeWorked } = require("../../utils/utils");

const getWeeklyStatsBreakdown = asyncHandler(async (req, res) => {
    try {
        const status = await Bugs.aggregate([
            {
                $match: {
                    createdBy: req.user._id
                }
            },
            {   
                $group: {
                    _id: { $toUpper: '$status' },
                    amount: { $sum: 1 },
                }
            },
        ]);

        const timeWorked = await Bugs.aggregate([
            {
                $match: {
                    createdBy: req.user._id
                }
            },
            {
                $group: {
                    _id: '$title',
                    timeWorked: { $push: '$timeWorked' },
                    bugId: { $push: '$_id' },
                }
            }
        ]);
        
        // I should be able to to this only with mongoose aggregate... I gotta study more.
        const breakDownByTimeWorked = await mapBreakDownByTimeWorked(timeWorked);
        const breakDownByStatus = await mapBreakDownByStatus(status);

        return res.status(200).json({
            status: 'success',
            data: {
                breakDownByStatus,
                breakDownByTimeWorked
            }
        })  
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error
        });
    }
})

module.exports = {
    getWeeklyStatsBreakdown
}