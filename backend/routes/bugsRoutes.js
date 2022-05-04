const express = require('express');
const router = express.Router();

const getBugs = require('../controllers/bugs/getBugs');
const getSingleBug = require('../controllers/bugs/getSingleBug');
const createBug = require('../controllers/bugs/createBug');
const updateBug = require('../controllers/bugs/updateBug');
const deleteBug = require('../controllers/bugs/deleteBug');

const { protect } = require('../middleware/authMiddleware');

router.get('/', getBugs);

router.get('/:id', protect, getSingleBug);

router.post('/', protect, createBug);

router.put('/:id', protect, updateBug);

router.delete('/:id', protect, deleteBug);

module.exports = router;