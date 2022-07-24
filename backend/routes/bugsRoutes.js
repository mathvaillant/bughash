const express = require('express');
const router = express.Router();

const getBugs = require('../controllers/bugs/getBugs');
const getSingleBug = require('../controllers/bugs/getSingleBug');
const createBug = require('../controllers/bugs/createBug');
const updateBug = require('../controllers/bugs/updateBug');
const deleteBug = require('../controllers/bugs/deleteBug');
const { checkBugId } = require('../middleware/checkBugId');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .all(protect)
    .get(getBugs)
    .post(createBug);

router.route('/:id')
    .all(protect, checkBugId)
    .get(getSingleBug)
    .patch(updateBug)
    .delete(deleteBug);

module.exports = router;