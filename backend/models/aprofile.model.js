const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const AprofileSchema = new Schema({
    name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	education: {
		type: String,
	},
	skills: {
		type: String,
	},
});

module.exports = Aprofile = mongoose.model("aprofiles", AprofileSchema);
