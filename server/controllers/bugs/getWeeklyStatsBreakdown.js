const asyncHandler = require('express-async-handler');
const Bugs = require('../../models/bugModel');

const getWeeklyStatsBreakdown = asyncHandler(async (req, res) => {
    try {
        const breakDownByStatus = await Bugs.aggregate([
            {   
                $group: {
                    _id: { $toUpper: '$status' },
                    amount: { $sum: 1 },
                }
            }
        ]);

        const breakDownByTimeWorked = await Bugs.aggregate([
            {
                $group: {
                    _id: '$title',
                    timeWorked: { $push: '$timeWorked' }
                }
            }
        ]);

        res.status(200).json({
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