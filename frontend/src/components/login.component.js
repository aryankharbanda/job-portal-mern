import React, { Component } from 'react';
import axios from 'axios';
import ls from "local-storage";

export default class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: "",
    }

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }
  
  // onChange = e => {
  //   this.setState({ [e.target.id]: e.target.value });
  // };

  onSubmit(e) {
    e.preventDefault();

    const UserData = {
      email: this.state.email,
      password: this.state.password,
    }

    // console.log(UserData);

    // axios.post('http://localhost:4000/users/register', newUser)
    axios.post('/users/login', UserData)
      .then( res => {
				alert("Logged In Successfully");

        // console.log(res.data.user.name);
        ls.set("auth", "true");
        ls.set("name", res.data.user.name);
        ls.set("email", res.data.user.email);
        ls.set("type", res.data.user.type);
        ls.set("id", res.data.user._id);

        window.location = "/";    
      })
      .catch( err => {
        alert(err.response.data[Object.keys(err.response.data)[0]]);
        console.log(err.response);
      });

    // this.setState({
    //   name: ''
    // })
  }


  render() {
    return (
      <div>
        <h3>Login</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Email: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.email}
                onChange={this.onChangeEmail}
                />
          </div>
          <div className="form-group"> 
            <label>Password: </label>
            <input  type="password"
                required
                className="form-control"
                value={this.state.password}
                onChange={this.onChangePassword}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Login" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}