import React, { Component } from 'react';
import axios from 'axios';
import ls from "local-storage";

export default class Rprofile extends Component {

    constructor(props) {
        super(props);
    
        this.onChangeBio = this.onChangeBio.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
            bio: '',
            phone: '',
        }
    }

    onChangeBio(e) {
        this.setState({
            bio: e.target.value
        })
    }
    onChangePhone(e) {
        this.setState({
            phone: e.target.value
        })
    }

    componentDidMount() {
        const newJson = {
            email: ls.get("email"),
        }
        console.log(newJson);
        axios.post('http://localhost:4000/profile/rget', newJson)
            .then(response => {
                console.log(response)
                if(response.data.length>0)
                {
                    if(response.data[0].bio){
                        this.setState({
                            bio: response.data[0].bio
                        })
                    }
                    if(response.data[0].phone){
                        this.setState({
                            phone: response.data[0].phone
                        })
                    }
                }
            })
        
    }

    onSubmit(e) {
        e.preventDefault();
    
        const newJson = {
            email: ls.get("email"),
            bio: this.state.bio,
            phone: this.state.phone,
        }
    
        console.log(newJson);
    
        axios.post('http://localhost:4000/profile/redit', newJson)
            .then(res => console.log(res.data))
            .catch(error => console.log(error.response));
    }

    render() {
      return (
        <div>
            <h3> Recruiter Profile </h3>
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
                <label>Bio: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.bio}
                    onChange={this.onChangeBio}
                    />
            </div>
            <div className="form-group"> 
                <label>Phone: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.phone}
                    onChange={this.onChangePhone}
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