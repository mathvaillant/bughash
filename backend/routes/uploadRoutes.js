const express = require('express');
const router = express.Router();

const fileUploadMiddleware = require('../middleware/fileUploadMiddleware');
const { protect } = require('../middleware/authMiddleware');
const fileUploader = require('../controllers/uploads/fileUploader');

router.post('/', protect, fileUploadMiddleware.single('file'), fileUploader);

module.exports = router;