const express = require('express');
const router = express.Router();

// const updateUser = require('../controllers/users/updateUser'); TODO: Issue with this route when deploying to heroku.
const registerUser = require('../controllers/users/registerUser');
const loginUser = require('../controllers/users/loginUser');

const { protect } = require('../middleware/authMiddleware');
 
router.post('/', registerUser);
router.post('/login', loginUser);
// router.patch('/:id', protect, updateUser);

module.exports = router;
