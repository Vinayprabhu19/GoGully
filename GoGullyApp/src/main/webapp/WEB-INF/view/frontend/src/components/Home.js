import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import TextField from "@material-ui/core/TextField";
import React, { Suspense, lazy, Component } from "react";
import "../css/Home.css";
class Home extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!

    this.state = {
      username: "",
      password: "",
      errorText: ""
      };

  }

    
  render() {
      return <p>Home</p>

  }
}

export default Home;
