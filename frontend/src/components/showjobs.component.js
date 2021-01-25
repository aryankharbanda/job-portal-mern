import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Fuse from 'fuse.js';
import ls from "local-storage";

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";

import SearchIcon from "@material-ui/icons/Search";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

export default class ShowJobs extends Component {

	constructor(props) {
		super(props);

		this.state = {
            jobs: [],
            // sortedJobs: [],
            ogJobs: [],
            sortSalary:true,
            sortDuration:true,
            minsal:'',
            maxsal:'',
            duration:'',
            search:'',
            showalert:false,
        };

        this.sortChangeSal = this.sortChangeSal.bind(this);
        this.sortChangeDur = this.sortChangeDur.bind(this);
        this.renderIconSal = this.renderIconSal.bind(this);
        this.renderIconDur = this.renderIconDur.bind(this);
        this.onChangeMinsal = this.onChangeMinsal.bind(this);
        this.onChangeMaxsal = this.onChangeMaxsal.bind(this);
        this.onSubmitFiltersal = this.onSubmitFiltersal.bind(this);
        this.handleClearFilters = this.handleClearFilters.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onSubmitFilterdur = this.onSubmitFilterdur.bind(this);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.handleApply = this.handleApply.bind(this);
	}

    componentDidMount() {
        axios.get('http://localhost:4000/jobs')
            .then(response => {
                this.setState({jobs: response.data, ogJobs:response.data});
            })
            .catch(function(error) {
                console.log(error);
            })
    }

    sortChangeSal(){
        var array = this.state.jobs;
        var flag = this.state.sortSalary;
        array.sort( (a, b) => {
            if(a.salary !== undefined && b.salary !== undefined){
                return (1 - flag*2) * (a.salary - b.salary);
            }
            else{
                return 1;
            }
        });
        this.setState({
            jobs:array,
            sortSalary:!this.state.sortSalary,
        })
    }
    renderIconSal(){
        if(this.state.sortSalary){
            return(<ArrowDownwardIcon/>)
        }
        else{
            return(<ArrowUpwardIcon/>)            
        }
    }

    sortChangeDur(){
        var array = this.state.jobs;
        var flag = this.state.sortDuration;
        array.sort( (a, b) => {
            if(a.duration !== undefined && b.duration !== undefined){
                return (1 - flag*2) * (a.duration - b.duration);
            }
            else{
                return 1;
            }
        });
        this.setState({
            jobs:array,
            sortDuration:!this.state.sortDuration,
        })
    }
    renderIconDur(){
        if(this.state.sortDuration){
            return(<ArrowDownwardIcon/>)
        }
        else{
            return(<ArrowUpwardIcon/>)            
        }
    }

    onChangeMinsal(e) {this.setState({minsal: e.target.value})};
    onChangeMaxsal(e) {this.setState({maxsal: e.target.value})};
    onChangeDuration(e) {this.setState({duration: e.target.value})};

    async onChangeSearch(e){
        await this.setState({search: e.target.value});
        if (this.state.search.length !== 0) {

            const fuse = new Fuse(this.state.jobs, {keys: ['title']})
            const results = fuse.search(this.state.search);

            this.setState({
                jobs: results.map(result => result.item)
            })
        }
    }

    onSubmitFiltersal(e) {
        e.preventDefault();

        var filteredJobs = [];
        var i;
        for (i = 0; i < this.state.jobs.length; ++i) {
            if ((this.state.jobs[i].salary <= this.state.maxsal)&&(this.state.jobs[i].salary >= this.state.minsal)) {
                filteredJobs.push(this.state.jobs[i]);
            }
        }

        this.setState({
            jobs:filteredJobs,
        })
    };

    handleClearFilters(e) {
        this.setState({
            jobs:this.state.ogJobs,
        })
    };

    onSubmitFilterdur(e) {
        e.preventDefault();

        var filteredJobs = [];
        var i;
        for (i = 0; i < this.state.jobs.length; ++i) {
            if (this.state.jobs[i].duration < this.state.duration) {
                filteredJobs.push(this.state.jobs[i]);
            }
        }

        this.setState({
            jobs:filteredJobs,
        })
    };

    handleApply(jobid) {
        console.log(this.state.showalert);
        
        console.log("apply");
        // if(this.state.showalert){
        var soppromt = prompt('Statement of Purpose:');

        if (soppromt !== null && soppromt.length < 250){
            
            const newApplication = {
                jobId: jobid,
                appId: ls.get("id"),
                sop: soppromt,
            }
        
            axios.post('/jobs/apply', newApplication)
                .then( res => {
                    alert("Applied Successfully");
                    this.setState({showalert:false});
                })
                .catch( err => {
                    alert(err.response.data[Object.keys(err.response.data)[0]]);
                    console.log(err.response);
                });
        }
        else{
            alert("SOP should be between 1 to 250 characters");
        }

        // }
    }

	render() {
        console.log(this.state.showalert);
		return (
			<div>
                <Grid container>
                    {/* <Grid item xs={12} md={3} lg={3}> */}
                    <Grid item fluid>
                        <List component="nav" aria-label="mailbox folders">
                            <ListItem text>
                                <h3>Filters</h3>
                                <br/>
                                <Link to="#" className="btn-flat waves-effect" onClick={this.handleClearFilters}>
                                    Clear Filters/Search
                                </Link>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={12} md={9} lg={9}>
                    <List component="nav" aria-label="mailbox folders">
                        {/* <div className="form-group">
                            <label>Search: </label>
                            <input type="text"
                                required
                                className="form-control"
                                value={this.state.search}
                                onChange={this.onChangeSearch}
                            />
                        </div> */}
                        <TextField 
                            id="standard-basic" 
                            label="Search" 
                            fullWidth={true}   
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment>
                                        <IconButton>
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                )}}
                            value={this.state.search}
                            onChange={this.onChangeSearch}
                        />
                    </List>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} md={3} lg={3}>
                        <List component="nav" aria-label="mailbox folders">

                            <ListItem button>
                                <form onSubmit={this.onSubmitFiltersal} noValidate autoComplete="off">
                                    <label>Salary</label>
                                    <TextField id="standard-basic" label="Enter Min" fullWidth={true} value={this.state.minsal} onChange={this.onChangeMinsal}/>
                                    <TextField id="standard-basic" label="Enter Max" fullWidth={true} value={this.state.maxsal} onChange={this.onChangeMaxsal}/>
                                    <input type="submit" value="Filter Salary" className="btn btn-primary"/>
                                </form>                                                                
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <form onSubmit={this.onSubmitFilterdur} noValidate autoComplete="off">
                                    <label>Duration</label>
                                    <TextField id="standard-basic" label="1-7 months" fullWidth={true} value={this.state.duration} onChange={this.onChangeDuration}/>
                                    <input type="submit" value="Filter Duration" className="btn btn-primary"/>
                                </form>                                                                
                            </ListItem>
                            <Divider />
                            {/* <ListItem button divider>
                                <Autocomplete
                                    id="combo-box-demo"
                                    options={this.state.jobs}
                                    getOptionLabel={(option) => option.title}
                                    style={{ width: 300 }}
                                    renderInput={
                                        (params) => 
                                        <TextField {...params} label="Select Names" variant="outlined" />
                                    }
                                />
                            </ListItem> */}
                        </List>
                    </Grid>
                    <Grid item xs={12} md={9} lg={9}>
                        <Paper>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                            {/* <TableCell> 
                                                <Button 
                                                    onClick={this.sortChange}>{this.renderIconSal()}
                                                </Button>
                                                Date
                                            </TableCell> */}
                                            <TableCell>Title</TableCell>
                                            <TableCell>Job-Type</TableCell>
                                            <TableCell>Recruiter</TableCell>
                                            <TableCell>
                                                <Button onClick={this.sortChangeSal}>
                                                    {this.renderIconSal()}
                                                </Button>
                                                Salary
                                            </TableCell>
                                            <TableCell>
                                                <Button onClick={this.sortChangeDur}>
                                                    {this.renderIconDur()}
                                                </Button>
                                                Duration
                                            </TableCell>
                                            {/* <TableCell>Rating</TableCell> */}
                                            <TableCell>Apply</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.jobs.map( (job,ind) => (
                                        <TableRow key={ind}>
                                            <TableCell>{job.title}</TableCell>
                                            <TableCell>{job.jobtype}</TableCell>
                                            <TableCell>{job.rec_name}</TableCell>
                                            <TableCell>{job.salary}</TableCell>
                                            <TableCell>{job.duration}</TableCell>
                                            <TableCell>
                                                <Button onClick={() => this.handleApply(job._id)}>
                                                    {/* {this.renderApplyState()} */}
                                                    Apply
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </Paper>               
                    </Grid>    
                </Grid>            
            </div>
		);
	}
}