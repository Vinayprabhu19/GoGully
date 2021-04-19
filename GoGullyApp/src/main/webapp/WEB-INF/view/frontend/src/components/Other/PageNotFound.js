
import React, { Suspense, lazy, Component } from "react";
import PageNotFoundImg from "../../img/PageNotFound.svg";
class PageNotFound extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!

    this.state = {

    };

  }


  render() {
    return <div style={{padding:"25px"}} className="row justify-content-center">
      <h2 style={{textAlign:"center",fontFamily:"Poppins",textTransform:"uppercase",margin:"20px"}}> Page Not Found</h2>
      <img src={PageNotFoundImg} style={{width:"100%"}}/>
    </div>

  }
}



export default PageNotFound;
