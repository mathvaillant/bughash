const express = require('express');
const router = express.Router();

const getBugs = require('../controllers/bugs/getBugs');
const getSingleBug = require('../controllers/bugs/getSingleBug');
const createBug = require('../controllers/bugs/createBug');
const updateBug = require('../controllers/bugs/updateBug');
const deleteBug = require('../controllers/bugs/deleteBug');
const { checkBugId } = require('../middleware/checkBugId');
const { protect } = require('../middleware/authMiddleware');
const { stringifyDescription } = require("../middleware/stringifyDescription");

router.route('/')
    .all(protect)
    .get(getBugs)
    .post(stringifyDescription, createBug);

router.route('/:id')
    .all(protect, checkBugId)
    .get(getSingleBug)
    .patch(stringifyDescription, updateBug)
    .delete(deleteBug);

module.exports = router;