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

        this.state = {};
        this.onCancel = this.onCancel.bind(this);
        this.onOK = this.onOK.bind(this);
      }
      onCancel(){
        this.props.close(null);
      }
      onOK(){
        this.props.close(this.state);
      }
  render() {
    return  <Dialog maxWidth={'sm'} fullWidth={true} onClose={(data)=>this.props.close(data)} disableBackdropClick={true} disableEscapeKeyDown={true} aria-labelledby="simple-dialog-title" open={this.props.open}>
    <DialogTitle id="simple-dialog-title">Add new player</DialogTitle>
    <div >
    <Grid container justify = "center" >
    <ButtonGroup variant="text" className="buttonGroup" color="primary" aria-label="text primary button group">
        <Button onClick={this.onOK}>OK</Button>
        <Button onClick={this.onCancel}>Cancel</Button>
      </ButtonGroup>
    </Grid>

  </div>
  </Dialog>
  }
}

export default AddNewPlayer;