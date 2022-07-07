const mongoose = require('mongoose');

const Files = mongoose.Schema({
    url: String,
    ref: String
});

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
        type: [Files],
        required: false
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Bug', bugSchema);