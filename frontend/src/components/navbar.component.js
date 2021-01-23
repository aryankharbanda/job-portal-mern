import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ls from "local-storage";

export default class Navbar extends Component {

  constructor() {
		super();
		// this.state = {
		// 	search: ""
		// };
  }
  
	handleClickLogout(event) {
		event.preventDefault();
		ls.set("auth", "false");
		ls.set("usertype", "");
		ls.set("email", "");
		window.location = "/";
	}

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Home</Link>
          </li>
          {ls.get("auth") === "true" ? null : (
            <li className="navbar-item">
              <Link to="/register" className="nav-link">Register</Link>
            </li>
						)}
          {ls.get("auth") === "true" ? null : (
            <li className="navbar-item">
              <Link to="/login" className="nav-link">Login</Link>
            </li>
						)}

          <li className="navbar-item">
          <Link to="/rprofile" className="nav-link">Rprofile</Link>
          </li>
          {ls.get("auth") === "true" ? (
							<li className="nav-item">
								<Link	className="nav-link" to="#"	onClick={this.handleClickLogout}>
									LogOut
								</Link>
							</li>
						) : null}
        </ul>
        </div>
      </nav>
    );
  }
}