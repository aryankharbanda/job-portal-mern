import React, { Component } from 'react';
import axios from 'axios';
import ls from "local-storage";

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';

import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

export default class ListApplications extends Component {

	constructor(props) {
		super(props);

		this.state = {
            apps: [],
            ogApps: [],
            sortName:true,
            sortDate:true,
            sortRate:true,
        };

        this.sortChangeName = this.sortChangeName.bind(this);
        this.renderIconName = this.renderIconName.bind(this);
        this.sortChangeDate = this.sortChangeDate.bind(this);
        this.renderIconDate = this.renderIconDate.bind(this);
        this.sortChangeRate = this.sortChangeRate.bind(this);
        this.renderIconRate = this.renderIconRate.bind(this);
        
        // this.renderAcceptButton = this.renderAcceptButton.bind(this);
        this.handleAccept = this.handleAccept.bind(this);

    }

    fetch = async () => {
        
        const jobId = ls.get("jobId");
        const data = {jobId: jobId};

        try {
            // const instance = axios.create();
            const response = await axios.post('/jobs/jobapps', data);
            
            console.log(response.data);
            if(response.data){
                this.setState({apps: response.data, ogApps:response.data});
            }
            console.log(this.state.apps);

        } catch (error) {
            console.log(error);
        }        

    }

    componentDidMount() {
        this.fetch();
        // console.log("b".localeCompare("a"));
    }

    sortChangeName(){

        var array = this.state.apps;
        var flag = this.state.sortName;
        array.sort( (a, b) => {
            if(a.appId.name !== undefined && b.appId.name !== undefined){
                return (1 - flag*2) * ((a.appId.name).localeCompare(b.appId.name));
            }
            else{
                return 1;
            }
        });
        this.setState({
            apps:array,
            sortName:!this.state.sortName,
        })
    }
    renderIconName(){
        if(this.state.sortName){
            return(<ArrowDownwardIcon/>)
        }
        else{
            return(<ArrowUpwardIcon/>)            
        }
    }

    sortChangeDate(){
        // new Date(b.date) - new Date(a.date)
        var array = this.state.apps;
        var flag = this.state.sortDate;
        array.sort( (a, b) => {
            if(a.date !== undefined && b.date !== undefined){
                return (1 - flag*2) * (new Date(a.date) - new Date(b.date));
            }
            else{
                return 1;
            }
        });
        this.setState({
            apps:array,
            sortDate:!this.state.sortDate,
        })
    }
    renderIconDate(){
        if(this.state.sortDate){
            return(<ArrowDownwardIcon/>)
        }
        else{
            return(<ArrowUpwardIcon/>)            
        }
    }

    sortChangeRate(){
        // var array = this.state.apps;
        // var flag = this.state.sortRate;
        // array.sort( (a, b) => {
        //     if(a.rating !== undefined && b.rating !== undefined){
        //         return (1 - flag*2) * ((a.rating) - (b.rating));
        //     }
        //     else{
        //         return 1;
        //     }
        // });
        this.setState({
            // apps:array,
            sortRate:!this.state.sortRate,
        })
    }
    renderIconRate(){
        if(this.state.sortRate){
            return(<ArrowDownwardIcon/>)
        }
        else{
            return(<ArrowUpwardIcon/>)            
        }
    }

    // renderAcceptButton = async (applicationId,appStatus) => {
    //     if(appStatus==="Applied"){
    //         return(
    //             <Button>
    //                 Shortlist
    //             </Button> 
    //         )
            
    //     }
    //     else{
    //         return(
    //             <Button>
    //                 Accept
    //             </Button> 
    //         )
    //     }
    // }

    handleAccept = (applicationId) => {

    }

	render() {
		return (
			<div>
                <Grid container>
                    <Grid >
                        <Paper>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                            <TableCell>
                                            <Button onClick={this.sortChangeName}>
                                                    {this.renderIconName()}
                                                </Button>
                                                Applicant Name
                                            </TableCell>
                                            <TableCell>Skills</TableCell>
                                            <TableCell>
                                                <Button onClick={this.sortChangeDate}>
                                                    {this.renderIconDate()}
                                                </Button>
                                                Date of Application
                                            </TableCell>
                                            <TableCell>Education</TableCell>
                                            <TableCell>SOP</TableCell>
                                            <TableCell>
                                                <Button onClick={this.sortChangeRate}>
                                                    {this.renderIconRate()}
                                                </Button>
                                                Rating
                                            </TableCell>
                                            <TableCell>Stage</TableCell>
                                            <TableCell>Accept</TableCell>
                                            <TableCell>Reject</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.apps.map( (app,ind) => {
                                        
                                        let buttontext = null;
                                        if(app.status==="Applied")
                                            buttontext='Shortlist';
                                        else if(app.status==="Shortlisted")
                                            buttontext='Accept';
                                        else
                                            buttontext='Accepted';   
                                        return(
                                            <TableRow key={ind}>
                                                <TableCell>{app.appId.name}</TableCell>
                                                <TableCell>{app.appId.aprofileId.skills}</TableCell>
                                                <TableCell>{app.date.split("T",1)}</TableCell>
                                                <TableCell>{app.appId.aprofileId.education}</TableCell>
                                                <TableCell>{app.sop}</TableCell>
                                                <TableCell>(dne)</TableCell>
                                                <TableCell>{app.status}</TableCell>
                                                <TableCell>
                                                    <Button 
                                                        onClick={() => this.handleAccept(app._id,app.status)}
                                                        >
                                                        {buttontext}
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <Button 
                                                        // onClick={() => this.handleApply(app._id)}
                                                        >
                                                        Reject
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </Paper>               
                    </Grid>    
                </Grid>            
            </div>
		);
	}
}