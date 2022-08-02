const express = require('express');
const router = express.Router();

const { getWeeklyStatsBreakdown } = require("../controllers/bugs/getWeeklyStatsBreakdown");

router.route('/').get(getWeeklyStatsBreakdown);

module.exports = router;