const mongoose = require('mongoose');

const bugSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    bugDescription: {
        type: Object,
        required: false /* [true, 'Please add a description.'] */
    },
    title: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: [true, 'Please add a status'],
    },
    files: {
        type: Object,
        required: false
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Bug', bugSchema);