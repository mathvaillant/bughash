const express = require('express');
const router = express.Router();

const registerUser = require('../controllers/users/registerUser');
const loginUser = require('../controllers/users/loginUser');
const updateUserInfo = require('../controllers/users/updateUserInfo');

const { protect } = require('../middleware/authMiddleware');
 
router.route('/')
    .post(registerUser);

router.route('/login')
    .post(loginUser);

router.route('/:id')
    .put(protect, updateUserInfo);

module.exports = router;
