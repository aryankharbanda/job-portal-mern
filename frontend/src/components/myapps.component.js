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

class MyApps extends Component {
    
    constructor(props) {
		super(props);

		this.state = {
            apps: [],
        };
	}

    componentDidMount() {
        const data = {
            appId: ls.get("id")
        }
        console.log(data);
        axios.post('/jobs/myapps', data)
            .then(response => {
                this.setState({apps: response.data});
            })
            .catch(function(error) {
                console.log(error);
            })
    }
    
    render() {
		return (
            <div>
                <Grid item xs={12} md={9} lg={9}>
                {/* <Grid > */}
                    <Paper>
                        <Table size="small">
                        {/* <Table> */}
                            <TableHead>
                                <TableRow>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Date Of Joining</TableCell>
                                        <TableCell>Recruiter</TableCell>
                                        <TableCell>Salary</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Rate Job</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.apps.map( (app,ind) => (
                                    <TableRow key={ind}>
                                        <TableCell>{app.jobId.title}</TableCell>
                                        <TableCell>{app.dateofjoining}</TableCell>
                                        <TableCell>{app.jobId.rec_name}</TableCell>
                                        <TableCell>{app.jobId.salary}</TableCell>
                                        <TableCell>{app.status}</TableCell>
                                        <TableCell>(dne)</TableCell>
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
export default MyApps;
