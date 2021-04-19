
import React, { Suspense, lazy, Component } from "react";
import UnauthorisedImg from "../../img/Unauthorised.svg";
class UnAuthorised extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!

    this.state = {

    };

  }


  render() {
    return <div style={{padding:"25px"}} className="row justify-content-center">
      <h2 style={{textAlign:"center",fontFamily:"Poppins",textTransform:"uppercase",margin:"20px"}}>unauthorized</h2>
      <img src={UnauthorisedImg} style={{width:"70%"}}/>
    </div>

  }
}



export default UnAuthorised;
