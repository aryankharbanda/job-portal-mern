import React, { Component } from "react";
import axios from 'axios';
import ls from "local-storage";

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { Link } from "react-router-dom";

class MyJobs extends Component {
    
    constructor(props) {
		super(props);

		this.state = {
            jobs: [],
        };
	}

    componentDidMount() {
        const data = {
            rec_email: ls.get("email")
        }
        // console.log(ls.get("email"));

        axios.post('/jobs/myjobs', data)
            .then(response => {
                console.log(response);
                this.setState({jobs: response.data});
            })
            .catch( error => {console.log(error);})
    }

    handleView = (jobId) => {
        ls.set("jobId",jobId);
        console.log(jobId);
    }

    render() {
		return (
            <div>
                <Grid >
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Date Of Posting</TableCell>
                                        <TableCell>Number of Applicants</TableCell>
                                        <TableCell>Remaining Number of Positions</TableCell>
                                        <TableCell>Edit</TableCell>
                                        <TableCell>Delete</TableCell>
                                        <TableCell>View Applicants</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.jobs.map( (job,ind) => (
                                    <TableRow key={ind}>
                                        <TableCell>{job.title}</TableCell>
                                        <TableCell>{job.date.split("T",1)}</TableCell>
                                        <TableCell>{job.no_applications}</TableCell>
                                        <TableCell>{job.max_positions-job.no_positions}</TableCell>
                                        <TableCell>(dne)</TableCell>
                                        <TableCell>(dne)</TableCell>
                                        <TableCell>
                                            <Link to="/listapplications" onClick={() => this.handleView(job._id)}>
                                                View
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </Paper>               
                </Grid> 
            </div>
		);
	}
}
export default MyJobs;
