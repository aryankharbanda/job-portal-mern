import React, { Component } from 'react';
import axios from 'axios';

export default class Register extends Component {

  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePassword2 = this.onChangePassword2.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      email: '',
      type: '',
      password: "",
      password2: "",
      // errors: {}
    }
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }
  onChangeType(e) {
    this.setState({
      type: e.target.value
    })
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }
  onChangePassword2(e) {
    this.setState({
      password2: e.target.value
    })
  }
  // onChange = e => {
  //   this.setState({ [e.target.id]: e.target.value });
  // };

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      type: this.state.type,
      password: this.state.password,
      password2: this.state.password2,
    }

    console.log(newUser);

    axios.post('http://localhost:4000/users/register', newUser)
    // axios.post('/users/register', newUser)
      .then(res => console.log(res.data))
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
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Name: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.name}
                onChange={this.onChangeName}
                />
          </div>
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
            <label>Type: </label>
            {/* <input  type="text"
                required
                className="form-control"
                value={this.state.type}
                onChange={this.onChangeType}
                /> */}
            <select 
                required 
                className="form-control"
                value={this.state.type}
                onChange={this.onChangeType}
              >
              <option value="a">Applicant</option>
              <option value="r">Recruiter</option>
            </select>
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
            <label>Re-enter Password: </label>
            <input  type="password"
                required
                className="form-control"
                value={this.state.password2}
                onChange={this.onChangePassword2}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}