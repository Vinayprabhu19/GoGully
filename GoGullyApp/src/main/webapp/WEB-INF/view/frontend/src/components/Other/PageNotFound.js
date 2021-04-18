
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
    return <div style={{padding:"25px"}}>
      <h2 style={{textAlign:"center"}}> Page Not Found</h2>
      <img src={PageNotFoundImg} style={{width:"70%"}}/>
    </div>

  }
}



export default PageNotFound;
