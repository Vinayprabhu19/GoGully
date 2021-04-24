import React, { Component } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Slider from '@material-ui/core/Slider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
class AddNewPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dob: "1996-05-19",
      name: "",
      errorText: "",
      email: "",
      gender: "M"
    };
    this.onCancel = this.onCancel.bind(this);
    this.onOK = this.onOK.bind(this);
  }
  onCancel() {
    this.props.close(null);
  }
  onOK() {
    fetch("/api/addNewPlayer", {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => {
      if (response.status == 200) {
        response.json().then(data => {
          this.props.close(this.state);
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
    return <Dialog maxWidth={'sm'} fullWidth={true} onClose={(data) => this.props.close(data)} disableBackdropClick={true} disableEscapeKeyDown={true} aria-labelledby="simple-dialog-title" open={this.props.open}>
      <DialogTitle id="title">Add new player</DialogTitle>
      <div >
        <Grid container justify="center" direction={"column"}>


          <div style={{paddingLeft:"20px",paddingRight:"20px"}}>
            <div className="row justify-content-center">
            </div>
            <div className="d-flex" />
            <form className="login-form">

              <div className="form-group">
                <div className="d-flex align-items-center justify-content-center">
                  <span className="" />
                </div>
                <label htmlFor="dob">Name</label>
                <input
                  type="text"
                  className="form-control rounded-left"
                  id="name"
                  required
                  value={this.state.name}
                  onChange={e => this.setState({ name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <div className="d-flex align-items-center justify-content-center">
                  <span className="" />
                </div>
                <label htmlFor="dob">Date of Birth</label>
                <input
                  type="date"
                  className="form-control rounded-left"
                  id="dob"
                  placeholder="Date of birth"
                  required
                  value={this.state.dob}
                  onChange={e => this.setState({ dob: e.target.value })}
                />
              </div>
              <div className="form-group">
                <div className="d-flex align-items-center justify-content-center">
                  <span className="" />
                </div>
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control rounded-left"
                  id="email"
                  required
                  value={this.state.email}
                  onChange={e => this.setState({ email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <div className="d-flex align-items-center justify-content-left">
                  <label>Gender</label>
                </div>

                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  style={{ marginRight: "10px" }}
                  defaultChecked={true}
                  onChange={e => this.setState({ gender: "M" })}
                />
                <label htmlFor="male" style={{ marginRight: "10px" }}>
                  Male
                    </label>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  style={{ marginRight: "10px" }}
                  onChange={e => this.setState({ gender: "F" })}
                />
                <label htmlFor="female" style={{ marginRight: "10px" }}>
                  Female
                    </label>
                <input
                  type="radio"
                  id="other"
                  name="gender"
                  value="other"
                  style={{ marginRight: "10px" }}
                  onChange={e => this.setState({ gender: "O" })}
                />
                <label htmlFor="other" style={{ marginRight: "10px" }}>
                  Other
                    </label>
              </div>

              <div className="form-group mt-4">
                <div className="errorText text-center">
                  <p className="mb-1">{this.state.errorText}</p>
                </div>
              </div>
            </form>
          </div>
          <div className="row justify-content-center" style={{width:"100%"}}>
          <ButtonGroup variant="text" className="buttonGroup" style={{width:"fit-content"}} color="primary" aria-label="text primary button group">
            <Button onClick={this.onOK}>OK</Button>
            <Button onClick={this.onCancel}>Cancel</Button>
          </ButtonGroup>
          </div>
        </Grid>

      </div>
    </Dialog>
  }
}

export default AddNewPlayer;