const mongoose = require('mongoose');

const bugFiles = mongoose.Schema({
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
        required: false
    },
    title: {
        type: String,
        required: [true, 'Please add a title.'],
    },
    status: {
        type: String,
        default: 'open',
        required: false,
    },
    files: {
        type: [bugFiles],
        required: false
    },
    storyPoints: {
        type: Number,
        default: true,    
    },
    githubIssue: {
        type: String,
        required: false
    },
    timeWorked: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Bug', bugSchema);