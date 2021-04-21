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
                      <th scope="col">Article Name</th>
                      <th scope="col">Author</th>
                      <th scope="col">Words</th>
                      <th scope="col">Shares</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="customCheck1" checked />
                          <label class="custom-control-label" for="customCheck1">1</label>
                        </div>
                      </td>
                      <td>Bootstrap 4 CDN and Starter Template</td>
                      <td>Cristina</td>
                      <td>913</td>
                      <td>2.846</td>
                    </tr>
                    <tr>
                      <td>
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="customCheck2" />
                          <label class="custom-control-label" for="customCheck2">2</label>
                        </div>
                      </td>
                      <td>Bootstrap Grid 4 Tutorial and Examples</td>
                      <td>Cristina</td>
                      <td>1.434</td>
                      <td>3.417</td>
                    </tr>
                    <tr>
                      <td>
                        <div class="custom-control custom-checkbox">
                          <input type="checkbox" class="custom-control-input" id="customCheck3" />
                          <label class="custom-control-label" for="customCheck3">3</label>
                        </div>
                      </td>
                      <td>Bootstrap Flexbox Tutorial and Examples</td>
                      <td>Cristina</td>
                      <td>1.877</td>
                      <td>1.234</td>
                    </tr>
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
    return [["Vinay P", "vinayprabhu19", "Male", 25, "Yes", 1], ["David Warner", "davidwarner", "Male", 25, "Yes", 1], ["MS Dhoni", "Dhoni", "Male", 25, "Yes", 1]];
  }
}

export default AddPlayer;