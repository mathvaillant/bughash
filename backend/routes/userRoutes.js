const express = require('express');
const router = express.Router();

const registerUser = require('../controllers/users/registerUser');
const loginUser = require('../controllers/users/loginUser');
const updateUser = require('../controllers/users/updateUser');

const { protect } = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/login', loginUser);
router.put('/:id', protect, updateUser);

module.exports = router;
