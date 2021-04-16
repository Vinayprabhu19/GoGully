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
import CreateTeam from "./components/Teams/CreateTeam";
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
          <Redirect to="/404" />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
