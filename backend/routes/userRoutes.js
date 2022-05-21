const express = require('express');
const router = express.Router();

const registerUser = require('../controllers/users/registerUser');
const loginUser = require('../controllers/users/loginUser');
const updateUser = require('../controllers/users/updateUser');

const { protect } = require('../middleware/authMiddleware');
const uploadUserAvatar = require("../middleware/uploadUserAvatar");

router.post('/', registerUser);
router.post('/login', loginUser);
router.put('/:id', protect, uploadUserAvatar.single('avatar'), updateUser);

module.exports = router;
