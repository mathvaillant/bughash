const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getProfile } = require('../controllers/userController')

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/profile', getProfile);

module.exports = router;
