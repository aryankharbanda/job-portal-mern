const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const JobSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	rec_email: {
		type: String,
		required: true
	},
	rec_name: {
		type: String,
		required: true
	},
	max_positions: {
		type: Number,
		required: true
    },
    max_applications: {
		type: Number,
		required: true
	},
	duration:{
		type: Number,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
    },
    deadline: {
        type: Date
	},
	jobtype: {
		type: String,
		required: true
	},
	salary: {
		type: Number,
		required: true
	},
    no_applications:{
		type: Number,
        default: 0
    },
    no_positions:{
		type: Number,
        default: 0
    }

});

module.exports = Job = mongoose.model("jobs", JobSchema);
