const express = require('express');
const router = express.Router();

const registerUser = require('../controllers/users/registerUser');
const loginUser = require('../controllers/users/loginUser');
const updateUser = require('../controllers/users/updateUser');
const updateUserAvatar = require("../controllers/users/UpdateUserAvatar");

const { protect } = require('../middleware/authMiddleware');
const uploadUserAvatar = require("../middleware/uploadUserAvatar");

router.post('/', registerUser);
router.post('/login', loginUser);
router.put('/:id', protect, updateUser);
router.put('/:id/avatar', protect, uploadUserAvatar.single('avatar'), updateUserAvatar);

module.exports = router;
