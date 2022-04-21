const express = require('express');
const router = express.Router();

const { 
    getBugs, 
    createBug,
    updateBug, 
    deleteBug 
} = require('../controllers/bugsController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getBugs).post(protect, createBug);
router.route('/:id').delete(protect, deleteBug).put(protect, updateBug);

/* 
router.get('/', getBugs)

router.post('/', createBug);

router.put('/:id', updateBug);

router.delete('/:id', deleteBug) 
*/

module.exports = router;