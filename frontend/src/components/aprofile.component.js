import React, { Component } from 'react';
import axios from 'axios';
import ls from "local-storage";

export default class Aprofile extends Component {

    constructor(props) {
        super(props);
    
        this.onChangeEducation = this.onChangeEducation.bind(this);
        this.onChangeSkills = this.onChangeSkills.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
            education: '',
            skills: '',
        }
    }

    onChangeEducation(e) {
        this.setState({
            education: e.target.value
        })
    }
    onChangeSkills(e) {
        this.setState({
            skills: e.target.value
        })
    }

    fetch = async () => {
        
        const newJson = {
            email: ls.get("email"),
        }
        try {
            const response = await axios.post('/profile/aget', newJson);
            
            console.log(response.data);
            // console.log(response.data.length);
                if(response.data)
                {
                    console.log("outer if");
                    if(response.data.education){
                        this.setState({
                            education: response.data.education
                        });
                        console.log("set ed state")
                    }
                    if(response.data.skills){
                        this.setState({
                            skills: response.data.skills
                        })
                    }
                }
        } catch (error) {
            console.log(error);
        }        

    }

    componentDidMount() {
        this.fetch();
        console.log(this.state);
        
    }

    onSubmit(e) {
        e.preventDefault();
    
        const newJson = {
            email: ls.get("email"),
            skills: this.state.skills,
            education: this.state.education,
        }
    
        console.log(newJson);
    
        axios.post('/profile/aedit', newJson)
            .then(res => console.log(res.data))
            .catch(error => console.log(error.response));
    }

    render() {
      return (
        <div>
            <h3> Applicant Profile </h3>
            <form onSubmit={this.onSubmit}>
            <div className="form-group"> 
                <label>Name: </label>
                <input  type="text"
                    className="form-control"
                    value={ls.get("name")}
                    readOnly
                    />
            </div>
            <div className="form-group"> 
                <label>Email: </label>
                <input  type="text"
                    className="form-control"
                    value={ls.get("email")}
                    readOnly
                    />
            </div>
            <div className="form-group"> 
                <label>Education: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.education}
                    onChange={this.onChangeEducation}
                    />
            </div>
            <div className="form-group"> 
                <label>Skills: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.skills}
                    onChange={this.onChangeSkills}
                    />
            </div>
            <div className="form-group">
                <input type="submit" value="Update Profile" className="btn btn-primary" />
            </div>
            </form>
            </div>
      );
    }
  }