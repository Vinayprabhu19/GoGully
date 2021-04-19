import {
  Redirect,
  Switch,
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import React, { Suspense, lazy } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Teams from "./components/Teams/Teams";
import EditTeam from "./components/Teams/EditTeam";
import CreateTeam from "./components/Teams/CreateTeam";
import PageNotFound from "./components/Other/PageNotFound";
import UnAuthorised from "./components/Other/Unauthorised";
import "./App.css";
function App() {
  return (
    <Router>
      <Suspense fallback={<CircularProgress color="inherit" />}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/Register" exact component={Register} />
          <Route path="/Login" exact component={Login} />
          <Route path="/Teams" exact component={Teams}/>
          <Route path="/CreateTeam" exact component={CreateTeam}/>
          <Route path="/EditTeam/:teamId" component={EditTeam} />
          <Route path="/404" exact component={PageNotFound} />
          <Route path="/unauthorised" exact component={UnAuthorised} />
          <Redirect to="/404" exact component={PageNotFound} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
