const mongoose = require('mongoose');

const bugFiles = mongoose.Schema({
    url: String,
    ref: String
});

const timeWorked = mongoose.Schema({
    workers: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }],
    timeWorked: Number,
    startedAt: Number,
});

const bugSchema = mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    description: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: [true, 'Please add a title.'],
        trim: true,
    },
    status: {
        type: String,
        default: 'open',
        enum: {
            values: ['open', 'closed', 'inprogress'],
            message: 'A status is required'
        }
    },
    files: {
        type: [bugFiles],
        required: false
    },
    githubIssue: {
        type: String,
        required: false
    },
    timeWorked: {
        type: [timeWorked],
        default: [],
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Bug', bugSchema);