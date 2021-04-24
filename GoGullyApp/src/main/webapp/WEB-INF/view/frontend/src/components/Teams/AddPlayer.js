import React, { Component } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Slider from '@material-ui/core/Slider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import AddNewPlayer from "./AddNewPlayer";
import Hidden from "@material-ui/core/Hidden";
import "../../css/Teams.css";
import AddIcon from '@material-ui/icons/Add';
import RefreshIcon from '@material-ui/icons/Refresh';
class AddPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onCancel = this.onCancel.bind(this);
    this.onOK = this.onOK.bind(this);
    this.state = {
      players: [],
      dialogANPOpen: false,
      columns: ["Name", "User Name", "Gender", "Age", "Registed User"],
      options: {
        filterType: 'checkbox', print: false, download: false
      },
      data: this.getMockData(),
      playersSelected: [],
      teamId: props.teamId
    }
    this.selectPlayer = this.selectPlayer.bind(this);
    this.queryData = this.queryData.bind(this);
    this.onSearchPlayer = this.onSearchPlayer.bind(this);
    this.onOK = this.onOK.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }
  componentDidMount() {
    this.queryData();
  }

  queryData() {
    var url = "http://localhost:8081";
    fetch("/api/getPlayers", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => {
      if (response.status == 200) {
        response.json().then(data => {
          data = data.map(function (p) {
            p.selected = false;
            return p;
          })
          this.setState({
            players: data,
            allPlayers: data
          })
          console.log(data);
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

  onSearchPlayer(evt) {
    var search = evt.target.value.toLowerCase();
    var players = this.state.allPlayers.filter(function (f) {
      return f.name.toLowerCase().includes(search);
    });
    this.setState({
      players: players
    });
  }
  selectPlayer(evt) {

    var userId = evt.target.value;
    var len = this.state.players.length;
    if (evt.target.checked) {
      //select player
      this.state.playersSelected.push(userId);
      var players = this.state.players;
      for (var i = 0; i < len; i++) {
        if (userId == players[i].userId) {
          players[i].selected = true;
          break;
        }
      }
      this.setState({
        players: players
      });
    }
    else {
      this.state.playersSelected = this.state.playersSelected.filter(function (p) {
        return p != userId;
      });
      var players = this.state.players;
      for (var i = 0; i < len; i++) {
        if (userId == players[i].userId) {
          players[i].selected = false;
          break;
        }
      }
      this.setState({
        players: players
      });
    }
  }
  onCancel() {
    this.setState({
      players:this.state.allPlayers
    });
    this.props.close(null);
  }
  onOK() {
    this.setState({
      players:this.state.allPlayers
    });
    fetch("/api/addPlayers/" + this.state.teamId, {
      method: "POST",
      body: JSON.stringify(this.state.playersSelected),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => {
      if (response.status == 500 || response.status == 400) {
        response.json().then(data => {
          this.setState({
            errorText: data.message
          });
        });
      }
      else
        this.props.close(this.state);
    });

  }
  render() {
    return <Dialog maxWidth={'sm'} fullWidth={true} onClose={(data) => this.props.close(data)} disableBackdropClick={true} disableEscapeKeyDown={true} aria-labelledby="simple-dialog-title" open={this.props.open}>
      <DialogTitle id="title">Add Players</DialogTitle>
      <div >
        <div style={{ width: "100%", height: "50px" }}>
          <div style={{ float: "right" }}>
            <input className="searchBoxDialog" placeholder="Search" onChange={this.onSearchPlayer} />
            <Button className="actionButton createButton" style={{ margin: "2px" }} startIcon={<AddIcon />} onClick={(e) => { this.setState({ dialogANPOpen: true }); }}>Add New Player</Button>
            <Button style={{ margin: "2px" }} startIcon={<RefreshIcon />} onClick={this.queryData}></Button>
            <AddNewPlayer open={this.state.dialogANPOpen} close={(data) => { this.setState({ dialogANPOpen: false }); }} />
          </div>
        </div>
        <Grid container justify="center" style={{width:"100%"}} >
          <h5 style={{ width: "100%", color: "red", textAlign: "center" }}>{this.state.errorText}</h5>
          <div class="container">
            <Hidden smDown>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Name</th>
                  <th scope="col">Username</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Age</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.players.map(p => (
                    <tr key={p.userId}>
                      <td>
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id={p.userId} onClick={this.selectPlayer} value={p.userId} checked={p.selected} />
                          <label class="custom-control-label" for={p.userId}></label>
                        </div>
                      </td>
                      <td>{p.name}</td>
                      <td>{p.userName}</td>
                      <td>{p.gender}</td>
                      <td>{p.age} Years</td>
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
                  <th scope="col"></th>
                  <th scope="col">Info</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.players.map(p => (
                    <tr key={p.userId}>
                      <td>
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id={p.userId} onClick={this.selectPlayer} value={p.userId} checked={p.selected} />
                          <label class="custom-control-label" for={p.userId}></label>
                        </div>
                      </td>
                      <td>
                        <div>
                          <p>
                            <span style={{fontWeight:"bold"}}>Name :</span> {p.name} <br></br>
                            <span style={{fontWeight:"bold"}}>Username :</span> {p.userName} <br></br>
                            <span style={{fontWeight:"bold"}}>Gender :</span> {p.gender} <br></br>
                            <span style={{fontWeight:"bold"}}>Age :</span> {p.age} <br></br>
                          </p>
                        </div>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
            </Hidden>
          </div>
          <ButtonGroup variant="text" className="buttonGroup" color="primary" aria-label="text primary button group">
            <Button onClick={this.onOK}>OK</Button>
            <Button onClick={this.onCancel}>Cancel</Button>
          </ButtonGroup>
        </Grid>

      </div>
    </Dialog>
  }

  getMockData() {
    return [{ "gender": "Male", "name": "Vinay P", "exists": "Yes", "userName": "vinayprabhu", "userId": 1, "age": 25 }, { "gender": "Male", "name": "David Warner", "exists": "Yes", "userName": "davidwarner", "userId": 2, "age": 34 },
    { "gender": "Male", "name": "Rashid Khan", "exists": "No", "userName": "", "userId": 3, "age": 22 }];
  }
}

export default AddPlayer;