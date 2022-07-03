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
        required: [true, 'Please add a title.'],
    },
    status: {
        type: String,
        required: true,
    },
    files: {
        type: [String],
        required: false
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Bug', bugSchema);