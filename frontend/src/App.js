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
import MyApps from "./components/myapps.component";
import MyJobs from "./components/myjobs.component";
import ListApplications from "./components/listapplications.component";
import Aprofile from "./components/aprofile.component";

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
        <Route path="/myapps" component={MyApps}/>
        <Route path="/myjobs" component={MyJobs}/>
        <Route path="/listapplications" component={ListApplications}/>
        <Route path="/aprofile" component={Aprofile}/>
      </div>
    </Router>
  );
}

export default App;
