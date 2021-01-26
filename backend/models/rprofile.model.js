const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const RprofileSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	phone: {
		type: String,
	},
	bio: {
		type: String,
		maxlength: 250
	},
});

module.exports = Rprofile = mongoose.model("rprofiles", RprofileSchema);
