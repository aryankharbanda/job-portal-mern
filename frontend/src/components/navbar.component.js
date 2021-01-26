import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ls from "local-storage";

export default class Navbar extends Component {

  // constructor() {
	// 	super();
	// 	// this.state = {
	// 	// 	search: ""
	// 	// };
  // }
  
	handleClickLogout(event) {
		event.preventDefault();
		ls.set("auth", "false");
		ls.set("name", "");
		ls.set("email", "");
		ls.set("type", "");
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
                        {ls.get("type") === "r" ? (
                            <li className="navbar-item">
                                <Link to="/rprofile" className="nav-link">Profile</Link>
                            </li>
                        ) : null}
                        {ls.get("type") === "a" ? (
                            <li className="navbar-item">
                                <Link to="/aprofile" className="nav-link">Profile</Link>
                            </li>
                        ) : null}
                        {ls.get("type") === "r" ? (
                            <li className="navbar-item">
                                <Link to="/createjob" className="nav-link">Add Job</Link>
                            </li>
                        ) : null}

                        {ls.get("type") === "a" ? (
                            <li className="navbar-item">
                                <Link to="/showjobs" className="nav-link">Job Listing</Link>
                            </li>
                        ) : null}
                        {ls.get("type") === "a" ? (
                            <li className="navbar-item">
                                <Link to="/myapps" className="nav-link">My Applications</Link>
                            </li>
                        ) : null}
                        {ls.get("type") === "r" ? (
                            <li className="navbar-item">
                                <Link to="/myjobs" className="nav-link">My Jobs</Link>
                            </li>
                        ) : null}

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