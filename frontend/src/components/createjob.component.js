import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ls from "local-storage";
import TextField from '@material-ui/core/TextField';

export default class CreateJob extends Component {

	constructor(props) {
		super(props);

		this.onChangeTitle = this.onChangeTitle.bind(this);
		this.onChangeDuration = this.onChangeDuration.bind(this);
		this.onChangeJobtype = this.onChangeJobtype.bind(this);
		this.onChangeMaxapplications = this.onChangeMaxapplications.bind(this);
		this.onChangeMaxpositions = this.onChangeMaxpositions.bind(this);
		this.onChangeSalary = this.onChangeSalary.bind(this);
		this.onChangeDeadline = this.onChangeDeadline.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			title: '',
			// rec_email: '',
			// rec_name: '',
			// max_positions: parseInt(''),
			max_positions: '',
			max_applications: '',
			duration: '',
			deadline: null,
			jobtype: "",
			salary: "",
		}
	}

	// onChange = e => {
	// 	this.setState({ [e.target.id]: e.target.value });
	// };

	onChangeTitle(e) {this.setState({title: e.target.value})}
	onChangeDuration(e) {this.setState({duration: e.target.value})}
	onChangeJobtype(e) {this.setState({jobtype: e.target.value})}
	onChangeMaxapplications(e) {this.setState({max_applications: e.target.value})}
	onChangeMaxpositions(e) {this.setState({max_positions: e.target.value})}
	onChangeSalary(e) {this.setState({salary: e.target.value})}
	onChangeDeadline(e) {this.setState({deadline: e.target.value})}	

	// handleChange = (e) => {
	// 	const { name, value } = e.target
	// 	this.setState({ [name]: value })
	// }

	onSubmit(e) {
		e.preventDefault();

		const newJob = {
			// name: this.state.name,
			title: this.state.title,
			rec_email: ls.get("email"),
			rec_name: ls.get("name"),
			max_positions: this.state.max_positions,
			max_applications: this.state.max_applications,
			duration: this.state.duration,
			deadline: this.state.deadline,
			jobtype: this.state.jobtype,
			salary: this.state.salary,
		}

		console.log(newJob);

		axios.post('http://localhost:4000/jobs/create', newJob)
			.then( res => {
				alert("Job created successfully Successfully");
				// window.location.reload();
			})
			.catch( res => {
				alert(res.response.data[Object.keys(res.response.data)[0]]);
			});

		// this.setState({
		// 	title: '',
		// 	max_positions: '',
		// 	max_applications: '',
		// 	duration: '',
		// 	deadline: null,
		// 	jobtype: "",
		// 	salary: "",
		// });
	}


	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col s8 offset-s2">
						<Link to="/" className="btn-flat waves-effect">
							<i className="material-icons left">
								keyboard_backspace
							</i>{" "}
							Back to home
						</Link>
						<div
							className="col s12"
							style={{ paddingLeft: "11.250px" }}
						>
							<h4>
								<b>Add Job</b>
							</h4>
						</div>
						<form noValidate onSubmit={this.onSubmit}>
							<div className="input-field col s12">
								<input
									onChange={this.onChangeTitle}
									value={this.state.title}
									id="title"
									type="text"
								/>
								<label htmlFor="name">Job Title</label>
							</div>
							<div className="input-field col s12">
								<input
									onChange={this.onChangeDuration}
									value={this.state.duration}
									id="title"
									type="text"
								/>
								<label htmlFor="name">Job Durarion (0-6 months)</label>
							</div>
							
							<div className="form-group"> 
								<label>JobType: </label>
								<select 
									required 
									placeholder="Type"
									className="form-control"
									value={this.state.jobtype}
									onChange={this.onChangeJobtype}
								>
								<option value="" > </option>
								<option value="ft">Full-Time</option>
								<option value="pt">Part-Time</option>
								<option value="wh">Work from Home</option>
								</select>
							</div>

							<div className="input-field col s12">
								<input
									onChange={this.onChangeMaxpositions}
									value={this.state.max_positions}
									id="title"
									type="text"
								/>
								<label htmlFor="name">Maximum Positions</label>
							</div>
							<div className="input-field col s12">
								<input
									onChange={this.onChangeMaxapplications}
									value={this.state.max_applications}
									id="title"
									type="text"
								/>
								<label htmlFor="name">Maximum Applications</label>
							</div>
							<div className="input-field col s12">
								<input
									onChange={this.onChangeSalary}
									value={this.state.salary}
									id="title"
									type="text"
								/>
								<label htmlFor="name">Salary</label>
							</div>
							<div className="form-group">
								<label>Deadline: </label>
								<div>
									<TextField
										id="deadline"
										type="datetime-local"

										value={this.state.deadline}
										onChange={this.onChangeDeadline}
									/>
								</div>
							</div>
							

							<div
								className="col s12"
								style={{ paddingLeft: "11.250px" }}
							>
								<button
									style={{
										width: "150px",
										borderRadius: "3px",
										letterSpacing: "1.5px",
										marginTop: "1rem"
									}}
									type="submit"
									// className="btn btn-large waves-effect waves-light hoverable blue accent-3"
								>
									Add Job to Listing
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}