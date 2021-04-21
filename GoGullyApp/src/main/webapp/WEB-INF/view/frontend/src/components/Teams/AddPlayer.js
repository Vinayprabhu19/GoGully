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
import "../../css/Teams.css";
import AddIcon from '@material-ui/icons/Add';

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
      playersSelected: []
    }
    this.selectPlayer = this.selectPlayer.bind(this);
  }
  componentDidMount() {
    var url = "http://localhost:8081";
    fetch(url + "/api/getPlayers", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => {
      if (response.status == 200) {
        response.json().then(data => {
          this.setState({
            players: data
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

  selectPlayer(evt){

    var userId= evt.target.value;
    if(evt.target.checked){
      //select player
      this.state.playersSelected.push(userId);
    }
    else{
      this.state.playersSelected=this.state.playersSelected.filter(function(p){
        return p!=userId;
      });
    }
  }
  onCancel() {
    this.props.close(null);
  }
  onOK() {
    debugger;
    this.props.close(this.state);
  }
  render() {
    return <Dialog maxWidth={'sm'} fullWidth={true} onClose={(data) => this.props.close(data)} disableBackdropClick={true} disableEscapeKeyDown={true} aria-labelledby="simple-dialog-title" open={this.props.open}>
      <DialogTitle id="title">Add Players</DialogTitle>
      <div >
        <div style={{ width: "100%", height: "50px" }}>
          <Button className="actionButton createButton" style={{ float: "right", margin: "10px" }} startIcon={<AddIcon />} onClick={(e) => { this.setState({ dialogANPOpen: true }); }}>Add New Player</Button>
          <AddPlayer open={this.state.dialogANPOpen} close={(data) => { this.setState({ dialogANPOpen: false }); }} />
        </div>
        <Grid container justify="center" >
          <div class="container">
            <div class="row">
              <div class="col-12">
                <table class="table table-bordered">
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
                      this.state.data.map(p => (
                        <tr key={p.userId}>
                          <td>
                            <div class="custom-control custom-checkbox">
                              <input type="checkbox" class="custom-control-input" id={p.userId} onClick={this.selectPlayer} value={p.userId}/>
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
              </div>
            </div>
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
    return [{"gender":"Male","name":"Vinay P","exists":"Yes","userName":"vinayprabhu","userId":1,"age":25},{"gender":"Male","name":"David Warner","exists":"Yes","userName":"davidwarner","userId":2,"age":34},
    {"gender":"Male","name":"Rashid Khan","exists":"No","userName":"","userId":3,"age":22}];
  }
}

export default AddPlayer;