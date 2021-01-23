import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";
import ls from "local-storage";

import Landing from "./components/landing.component";
import Welcome from "./components/welcome.component";
import Navbar from "./components/navbar.component"
import Register from "./components/register.component";
import Login from "./components/login.component"
import UsersList from "./components/users-list.component";
import Rprofile from "./components/rprofile.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        {ls.get("auth") === "true" ? (
						<Route exact path="/" component={Welcome} />
					) : (
						<Route exact path="/" component={Landing} />
					)}
        {/* <Route path="/" exact component={UsersList} /> */}
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/rprofile" component={Rprofile}/>
      </div>
    </Router>
  );
}

export default App;
