import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import TextField from "@material-ui/core/TextField";
import React, { Suspense, lazy, Component } from "react";
import "../css/Login.css";
import { useHistory } from "react-router-dom";

class Register extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!

    this.state = {
      dob: "1996-05-19",
      username: "",
      name: "",
      password: "",
      passwordRepeat: "",
      errorText: "",
      email: "",
      gender: "M"
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(evt) {
    if (
      this.state.password == "" ||
      this.state.passwordRepeat == "" ||
      this.state.username == "" ||
      this.state.dob == ""
    ) {
      return;
    }
    if (this.state.password != this.state.passwordRepeat) {
      this.setState({
        errorText: "Passwords don't match"
      });
    }
    evt.preventDefault();
    var url = "http://localhost:8081";
    fetch( "/api/register", {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(response => {
      if (response.status == 200) {
        response.json().then(data => {
          this.props.history.push("/Login");
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
    return (
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-7 col-lg-5">
              <div className="login-wrap p-4 p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-6 text-center">
                    <h2 id="goGullyText">Go Gully</h2>
                  </div>
                </div>
                <div className="d-flex" />
                <form action="/api/register" className="login-form">
                  <div className="form-group">
                    <div className="d-flex align-items-center justify-content-center">
                      <span />
                    </div>
                    <label htmlFor="username">User Name</label>
                    <input
                      type="text"
                      className="form-control rounded-left"
                      id="username"
                      required
                      value={this.state.username}
                      onChange={e =>
                        this.setState({ username: e.target.value })
                      }
                    />
                  </div>

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
                  <div className="form-group">
                    <div className="icon d-flex align-items-center justify-content-center">
                      <span className="fa fa-lock" />
                    </div>
                    <input
                      type="password"
                      className="form-control rounded-left"
                      placeholder="Password"
                      required
                      value={this.state.password}
                      onChange={e =>
                        this.setState({ password: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <div className="icon d-flex align-items-center justify-content-center">
                      <span className="fa fa-lock" />
                    </div>
                    <input
                      type="password"
                      className="form-control rounded-left"
                      placeholder="Re-Enter Password"
                      required
                      value={this.state.passwordRepeat}
                      onChange={e =>
                        this.setState({ passwordRepeat: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group d-flex align-items-center">
                    <div className="w-100 d-flex justify-content-center">
                      <button
                        className="btn btn-primary rounded submit"
                        onClick={this.onSubmit}
                      >
                        Register
                      </button>
                    </div>
                  </div>
                  <div className="form-group mt-4">
                    <div className="w-100 text-center">
                      <p className="mb-1">
                        Already have an account? <a href="/Login">login</a>
                      </p>
                    </div>
                  </div>

                  <div className="form-group mt-4">
                    <div className="errorText text-center">
                      <p className="mb-1">{this.state.errorText}</p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Register;
