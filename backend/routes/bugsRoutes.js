const express = require('express');
const router = express.Router();

const { 
    getBugs, 
    createBug,
    updateBug, 
    deleteBug 
} = require('../controllers/bugsController');

router.route('/').get(getBugs).post(createBug);
router.route('/:id').delete(deleteBug).put(updateBug);

/* 
router.get('/', getBugs)

router.post('/', createBug);

router.put('/:id', updateBug);

router.delete('/:id', deleteBug) 
*/

module.exports = router;