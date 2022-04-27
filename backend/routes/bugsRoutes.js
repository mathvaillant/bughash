const express = require('express');
const router = express.Router();

const { 
    getBugs, 
    createBug,
    updateBug, 
    deleteBug 
} = require('../controllers/bugsController');

const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getBugs)

router.post('/', protect, createBug);

router.put('/:id', protect, updateBug);

router.delete('/:id', protect, deleteBug) 


module.exports = router;