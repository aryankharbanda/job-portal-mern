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
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: ['Applied', 'Shortlisted', 'Rejected'],
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


});

module.exports = Job = mongoose.model("applications", ApplicationSchema);
