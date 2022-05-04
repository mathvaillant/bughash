const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    sourceUrl: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    collection: 'uploads'
});

module.exports = mongoose.model('Upload', uploadSchema);