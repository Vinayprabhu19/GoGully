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
class Teams extends Component {
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
      <div id="teamsContainer">
        <div style={{ width: "100%", height: "50px" }}>
          <h5 style={{ float: "left", fontWeight: "bold" }}>Teams ({this.state.teams.length})</h5>
          <a href="/CreateTeam" style={{ float: "right" }}><Button className="actionButton createButton" style={{backgroundColor:"green",color:"white"}} startIcon={<AddIcon />}>Create Team</Button></a>
        </div>
        <div>
          {
            this.state.teams.map(team => (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  className="teamAccordion"
                >
                  <div className="col justify-content-center teamAccordionSummary">
                    <div className="col justify-content-left" style={{ float: "left", width: "90%" }}>
                      <h6 style={{ fontWeight: "bold" }}>{team.teamName}</h6>
                      <div className="row justify-content-left" style={{ paddingLeft: "10px", marginTop: "10px" }}>
                        <h6 className="tag"><span style={{ width: "15px" }}><LocationOnIcon /></span>{team.location}</h6>
                        <h6 className="tag"><span style={{ fontWeight: "bold" }}>Players : </span>{team.playerCount}</h6>
                      </div>
                    </div>
                    {
                      team.owner && <a href={"/EditTeam/"+team.teamId}><EditIcon style={{ width: "25px", height: "25px", float: "right", color: "green" }}></EditIcon></a>
                    }
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container justify="center" >
                    <table border={2} cellPadding={5}>
                      <thead>
                        <tr>
                          <th>Player</th>
                          <th>Role</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          team.players.map(p => (
                            <tr key={p.name}>
                              <td>{p.name}</td>
                              <td>{p.role}</td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            ))
          }

        </div>
      </div>
    </div>

  }
}



export default Teams;
