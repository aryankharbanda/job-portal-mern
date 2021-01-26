const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ApplicationSchema = new Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'jobs',
        required: true
    },
    appId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    // appId: {
    //     type: String,
    //     required: true
    // },
    status:{
        type: String,
        enum: ['Applied', 'Shortlisted', 'Accepted', 'Rejected'],
        default: 'Applied'
    },
    date: {
        type: Date,
        default: Date.now
    },
    sop: {
        type: String, 
        maxlength: 250 
    },
    dateofjoining:{
        type: Date,
        default: null
        // default: '0000-01-01T00:00:00.173Z'
    }

});

module.exports = Application = mongoose.model("applications", ApplicationSchema);
