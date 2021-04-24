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
import AddPlayer from "./AddPlayer";
import DeleteIcon from '@material-ui/icons/Delete';
import RefreshIcon from '@material-ui/icons/Refresh';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
class EditTeam extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    var teamId = this.props.match.params.teamId;
    this.state = {
      players: [],
      dialogAPOpen: false,
      teamId: teamId,
      data: this.getMockData()
    };

    this.queryData = this.queryData.bind(this);

  }

  componentDidMount() {
    this.queryData();

  }

  deletePlayer(playerId) {
    var teamId = this.props.match.params.teamId;
    var url = "http://localhost:8081";
    fetch("/api/removePlayer/" + teamId + "/" + playerId, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => {
      if (response.status == 200) {
        this.queryData();
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

  queryData() {
    var teamId = this.props.match.params.teamId;
    var url = "http://localhost:8081";
    fetch("/api/getTeam/" + teamId, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => {
      if (response.status == 200) {
        response.json().then(data => {
          this.setState({
            players: data,
            teamId: teamId
          })
        });
      }
      if (response.status == 500 || response.status == 400) {
        response.json().then(data => {
          this.setState({
            errorText: data.message
          });
          this.props.history.push("/PageNotFound");
        });
      }
    });
  }

  setRole(v,playerId){
    var value=v.props.value;
    var teamId = this.props.match.params.teamId;
    var url = "http://localhost:8081";
    fetch("/api/setRole/" + teamId + "/" + playerId+"/"+value, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => {
      if (response.status == 200) {
        this.queryData();
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
                  <a href="/Teams" className="menuMenuItem">Teams</a>
                </Button>
                <Button style={{ float: "left" }}>
                  <a href="/Teams" className="menuMenuItem">Tournaments</a>
                </Button>
                <Button style={{ float: "left" }}>
                  <a href="/Teams" className="menuMenuItem">Matches</a>
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
          <div style={{ float: "right" }}>
            <Button className="actionButton createButton" style={{ backgroundColor: "green", color: "white" }} startIcon={<AddIcon />} onClick={(e) => { this.setState({ dialogAPOpen: true }); }}>Add New Player</Button>
            <AddPlayer open={this.state.dialogAPOpen} close={(data) => { this.setState({ dialogAPOpen: false }); }} teamId={this.state.teamId} />
            <Button style={{ margin: "2px" }} startIcon={<RefreshIcon />} onClick={this.queryData}></Button>
          </div>
        </div>
      </div>
      <Grid container justify="center" style={{ padding: "10px" }}>
        <h5 style={{ width: "100%", color: "red", textAlign: "center" }}>{this.state.errorText}</h5>
        <Hidden smDown>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Player</th>
                <th scope="col">Gender</th>
                <th scope="col">Age</th>
                <th scope="col">Role</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.data.map(p => (
                  <tr key={p.name}>
                    <td>{p.name}</td>
                    <td>{p.gender}</td>
                    <td>{p.age}</td>
                    <td>
                      <Select value={p.role} style={{width:"150px"}} onChange={(e,v)=>{this.setRole(v,p.userId)}}>
                        <MenuItem value="blank" ></MenuItem>
                        <MenuItem value="C" >Captain</MenuItem>
                        <MenuItem value="VC" >Vice Captain</MenuItem>
                        <MenuItem value="WK" >Wicket Keeper</MenuItem>
                      </Select>
                    </td>
                    <Button style={{ margin: "2px" }} startIcon={<DeleteIcon />} onClick={e => { this.deletePlayer(p.userId) }} ></Button>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </Hidden>
        <Hidden mdUp>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Info</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.data.map(p => (
                  <tr key={p.userId}>
                    <td>
                      <div>
                        <p>
                          <span style={{ fontWeight: "bold" }}>Name :</span> {p.name} <br></br>
                          <span style={{ fontWeight: "bold" }}>Username :</span> {p.userName} <br></br>
                          <span style={{ fontWeight: "bold" }}>Gender :</span> {p.gender} <br></br>
                          <span style={{ fontWeight: "bold" }}>Age :</span> {p.age} <br></br>
                          <span style={{ fontWeight: "bold" }}>Role : </span>
                          <Select value={p.role} onChange={(e,v)=>{this.setRole(v,p.userId)}}>
                            <MenuItem value="blank" ></MenuItem>
                            <MenuItem value="C" >Captain</MenuItem>
                            <MenuItem value="VC" >Vice Captain</MenuItem>
                            <MenuItem value="WK" >Wicket Keeper</MenuItem>
                          </Select>
                          <br></br>
                        </p>
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </Hidden>
      </Grid>
    </div>

  }

  getMockData() {
    return [{ "gender": "Male", "name": "Vinay P", "exists": "Yes", "userName": "vinayprabhu", "userId": 1, "age": 25,"role":"C" }, { "gender": "Male", "name": "David Warner", "exists": "Yes", "userName": "davidwarner", "userId": 2, "age": 34 },
    { "gender": "Male", "name": "Rashid Khan", "exists": "No", "userName": "", "userId": 3, "age": 22 }];
  }
}



export default EditTeam;
