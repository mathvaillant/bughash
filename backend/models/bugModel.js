const mongoose = require('mongoose');

const bugSchema = mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    description: {
        type: String,
        required: [true, 'Please add a description.']
    },
    title: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    files: {
        type: [mongoose.Schema.Types.ObjectId],
        required: false,
        ref: 'Upload'
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Bug', bugSchema);