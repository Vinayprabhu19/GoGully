import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import React, { Suspense, lazy, Component } from "react";
import "../css/Home.css";
import SearchIcon from '@material-ui/icons/Search';
import ProfileMenu from './Menu/ProfileMenu';
import NavigationMenu from './Menu/NavigationMenu';
import HomeImg from '../img/Home.svg';

class Home extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!

    this.state = {

    };

  }


  render() {
    return <div className="homePage">
      <Hidden smDown>
        <AppBar id="appBar" position="static" elevation={0}>
          <Toolbar>
            <h1 id="goGullyTextSmall">GoGully</h1>
            <section className="rightToolbar">
              <div style={{ clear: "both", verticalAlign: true }}>
                <Button style={{ float: "left" }}>
                  <a href="/Teams" className="menuOption">Teams</a>
                </Button>
                <Button style={{ float: "left" }}>
                  <a href="/Teams" className="menuOption">Tournaments</a>
                </Button>
                <Button style={{ float: "left" }}>
                  <a href="/Teams" className="menuOption">Matches</a>
                </Button>
                <ProfileMenu floatType={"right"} />
              </div>
            </section>
          </Toolbar>
        </AppBar>
      </Hidden>
      <Hidden mdUp>
        <AppBar id="appBar" position="static" elevation={0}>
          <Toolbar>
            <h1 id="goGullyTextSmall">GoGully</h1>
            <section className="rightToolbar">
              <NavigationMenu floatType={"right"} />
            </section>
          </Toolbar>
        </AppBar>
      </Hidden>
      <Hidden mdDown>
        <Grid container id="optionGrid" spacing={0} direction={"column"} style={{padding:"20px"}}>
          <div className="halfContainer">
            <img src={HomeImg} id="homeImg" />
          </div>
          <div className="halfContainer">
            <h1 id="goGullyText">GoGully</h1>
            <Paper id="searchField" elevation={5}>
              <input id="searchInput" placeholder="Search" />
              <SearchIcon id="searchIcon" />
            </Paper>
          </div>
        </Grid>
      </Hidden>
      <Hidden lgUp>
        <div className="row justify-content-center" >
          <img src={HomeImg} id="homeImg" />
          <h1 id="goGullyText" style={{ marginTop: 0 }}>GoGully</h1>
          <Paper id="searchField" elevation={5}>
            <input id="searchInput" placeholder="Search" />
            <SearchIcon id="searchIcon" />
          </Paper>
        </div>
      </Hidden>

    </div>

  }
}



export default Home;
