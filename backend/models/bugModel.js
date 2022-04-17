const mongoose = require('mongoose');

const bugSchema = mongoose.Schema({
    bugDescription: {
        type: Object,
        required: false /* [true, 'Please add a description.'] */
    },
    bugId: {
        type: String,
        required: true
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