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

    console.log(UserData);

    // axios.post('http://localhost:4000/users/register', newUser)
    axios.post('/users/login', UserData)
    //   .then(res => console.log(res.data))
      .then(function(res) {
        ls.set("auth", "true");
        console.log(res.data.user.name);
        ls.set("username", res.data.user.name);
        ls.set("email", res.data.user.email);
        ls.set("usertype", res.data.user.usertype);
        // window.location = "/";
    })
    // .catch(function(res) {
    //     alert(res.response.data[Object.keys(res.response.data)[0]]);
    // });
    .catch(error => {
      console.log(error.response)
    })


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