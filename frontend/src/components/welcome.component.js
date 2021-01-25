import React, { Component } from "react";
import ls from "local-storage";

class Welcome extends Component {
	render() {
		return (
			<h3>
				{/* {ls.get("id")} */}
				Hello {ls.get("name")}, you are {ls.get("type") === "a" ? ("an Applicant.") : ("a Recruiter.")}
			</h3>
		);
	}
}
export default Welcome;
