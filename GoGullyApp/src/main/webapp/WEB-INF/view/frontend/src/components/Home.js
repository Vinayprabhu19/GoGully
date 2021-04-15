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
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import ProfileMenu from './Menu/ProfileMenu';
import NavigationMenu from './Menu/NavigationMenu';
import HomeImg from '../img/Home.png';

class Home extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!

    this.state = {
      username: "",
      password: "",
      errorText: "",
      profileMenu:{
        items:[
          {
            link:"/Profile",
            text:"Profile"
          },
          {
            link:"/Logout",
            text:"Logout"
          }
        ]
      }
      };

  }

    
  render() {
      return <div className="homePage">
        <Hidden smDown>
        <AppBar id="appBar" position="static">
              <Toolbar>
                <h1 id="goGullyTextSmall">GoGully</h1>
                <section className="rightToolbar">
                <div style={{clear: "both",verticalAlign:true}}>
                <Button style={{float: "left"}}>
                  <a href="/Teams" className="menuOption">Teams</a>
                </Button>
                <Button style={{float: "left"}}>
                  <a href="/Teams" className="menuOption">Tournaments</a>
                </Button>
                <Button style={{float: "left"}}>
                  <a href="/Teams" className="menuOption">Matches</a>
                </Button>
                <ProfileMenu  floatType={"right"} />
                </div>
                </section>
              </Toolbar>
            </AppBar>
            </Hidden> 
        <Hidden mdUp>
        <AppBar id="appBar" position="static">
              <Toolbar>
                <h1 id="goGullyTextSmall">GoGully</h1>
                <section className="rightToolbar">
                  <NavigationMenu floatType={"right"}/>
                </section>
              </Toolbar>
            </AppBar>
            </Hidden>   
            
        <Grid container  id="optionGrid" spacing={4} direction={"column"}>
        <h1 id="goGullyText">GoGully</h1>
        <Paper id="searchField" elevation={5}>
                    <input id="searchInput" placeholder="Search"/>
                    <SearchIcon id="searchIcon"/>
                    </Paper>
        <a style={{width:"100%",textAlign:"center",marginTop:"20px",color:"blue"}}>Start a match?</a>
        </Grid>
      </div>

  }
}



export default Home;
