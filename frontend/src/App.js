import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";
import ls from "local-storage";

import Landing from "./components/landing.component";
import Welcome from "./components/welcome.component";
import Navbar from "./components/navbar.component"
import Register from "./components/register.component";
import Login from "./components/login.component"
import Rprofile from "./components/rprofile.component";
import CreateJob from "./components/createjob.component";
import ShowJobs from "./components/showjobs.component";

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
        <Route path="/createjob" component={CreateJob}/>
        <Route path="/showjobs" component={ShowJobs}/>
      </div>
    </Router>
  );
}

export default App;
