import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import React, { Suspense, lazy, Component } from "react";
import "../../css/Home.css";
import "../../css/Teams.css";
import SearchIcon from '@material-ui/icons/Search';
import ProfileMenu from '../Menu/ProfileMenu';
import NavigationMenu from '../Menu/NavigationMenu';
import AddIcon from '@material-ui/icons/Add';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import LocationOnIcon from '@material-ui/icons/LocationOn';
class EditTeam extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!

    this.state = {
      teams: []
    };

  }

  componentDidMount() {
    var url = "http://localhost:8081";
    fetch("/api/getTeams", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => {
      if (response.status == 200) {
        response.json().then(data => {
          this.setState({
            teams: data
          })
        });
      }
      if (response.status == 500 || response.status == 400) {
        response.json().then(data => {
          this.setState({
            errorText: data.message
          });
        });
      }
    });
  }

  render() {
    return <div>
      <Hidden smDown>
        <AppBar id="appBar" position="static" >
          <Toolbar>
            <a href="/"><h1 id="goGullyTextSmall">GoGully</h1></a>
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
        <AppBar id="appBar" position="static">
          <Toolbar>
            <h1 id="goGullyTextSmall">GoGully</h1>
            <section className="rightToolbar">
              <NavigationMenu floatType={"right"} />
            </section>
          </Toolbar>
        </AppBar>
      </Hidden>
      <div id="teamsContainer"></div>
    </div>

  }
}



export default EditTeam;
