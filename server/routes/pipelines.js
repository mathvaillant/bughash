const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware');
const { getWeeklyStatsBreakdown } = require("../controllers/bugs/getWeeklyStatsBreakdown");

router.route('/').get(protect, getWeeklyStatsBreakdown);

module.exports = router;