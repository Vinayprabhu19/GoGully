import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import TextField from "@material-ui/core/TextField";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import React, { Suspense, lazy, Component } from "react";
import Teams from '../img/Teams.jpg';
import Tournaments from '../img/Tournaments.jpg';
import Matches from '../img/Matches.jpg';
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
      return <div className="homePage">
        <AppBar id="appBar" position="static">
              <Toolbar>
                <h1 id="goGullyTextSmall">GoGully</h1>
                <section className="rightToolbar">
                <div style={{clear: "both",verticalAlign:true}}>
                    <h2 style={{float: "left"}} className="topText"></h2>
                    <h3 style={{float: "right"}} className="topText"><a href="Logout" style={{color:"green"}}>Logout</a></h3>
                </div>
                </section>
              </Toolbar>
            </AppBar>
        <div className="middleSection">
        <h1 id="goGullyText">GoGully</h1>
        <Hidden mdUp>
        <Grid container justify="center" id="optionGrid" alignItems="center" spacing={4} direction={"column"}>
            <Grid item justify="center" alignContent="center">
            <Button variant="contained" color="secondary" className="optionButton">
              Teams
            </Button>
            </Grid>
            <Grid item justify="center" alignContent="center">
            <Button variant="contained" color="secondary" className="optionButton">
              Matches
            </Button>
            </Grid>
            <Grid item justify="center" alignContent="center">
            <Button variant="contained" color="secondary" className="optionButton">
              Tournaments
            </Button>
            </Grid>
        </Grid>
        </Hidden>
        <Hidden smDown>
        <Grid container justify="center" id="optionGrid" alignItems="center" spacing={9} >
            <Grid item justify="center" alignContent="center">
                <Paper elevation={10} className="paperContainer">
                  <img src={Teams} className="paperImg"></img>
                  <h3 className="optionLine">Teams</h3>
                </Paper>
            </Grid>
            <Grid item justify="center" alignContent="center">
            <Paper elevation={10} className="paperContainer">
                  <img src={Matches} className="paperImg"></img>
                  <h3 className="optionLine">Matches</h3>
                </Paper>
            </Grid>
            <Grid item justify="center" alignContent="center">
            <Paper elevation={10} className="paperContainer">
                  <img src={Tournaments} className="paperImg"></img>
                  <h3 className="optionLine">Tournaments</h3>
                </Paper>
            </Grid>
        </Grid>
        </Hidden>
        </div>
      </div>

  }
}

export default Home;
