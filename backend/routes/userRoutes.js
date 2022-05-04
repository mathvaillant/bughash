const express = require('express');
const router = express.Router();

const registerUser = require('../controllers/users/registerUser');
const loginUser = require('../controllers/users/loginUser');

const { protect } = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/login', loginUser);

module.exports = router;
