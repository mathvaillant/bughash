const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

const Upload = require('../../models/uploadModel');

const fileUploader = asyncHandler(async (req, res) => {
    const url = `${req.protocol}://${req.get('host')}`;

    const upload = new Upload({
        _id: new mongoose.Types.ObjectId(),
        sourceUrl: `${url}/uploads/${req.file.filename}`
    });

    const restult = await upload.save();

    res.status(200).json({
        _id: restult._id,
        sourceUrl: restult.sourceUrl
    });
});

module.exports = fileUploader;