import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import TextField from "@material-ui/core/TextField";
import React, { Suspense, lazy, Component } from "react";
import "../css/Login.css";
class Login extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!

    this.state = {
      username: "",
      password: "",
      errorText: ""
      };

      this.onSubmit = this.onSubmit.bind(this);
  }

    onSubmit(evt) {
        evt.preventDefault();
        fetch("/api/login", {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        }).then(response => {
            if (response.status == 200) {
                this.props.history.push("/");
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
                <form action="#" className="login-form">
                  <div className="form-group">
                    <div className="icon d-flex align-items-center justify-content-center">
                      <span className="fa fa-user" />
                    </div>
                    <input
                      type="text"
                      className="form-control rounded-left"
                      placeholder="Username"
                      required
                      value={this.state.username}
                      onChange={e =>
                        this.setState({ username: e.target.value })
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
                      placeholder="Password"
                      required
                      value={this.state.password}
                      onChange={e =>
                        this.setState({ password: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group d-flex align-items-center">
                    <div className="w-100 d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-primary rounded submit"
                        onClick={this.onSubmit}
                      >
                        Login
                      </button>
                    </div>
                  </div>
                  <div className="form-group mt-4">
                    <div className="w-100 text-center">
                      <p className="mb-1">
                        Don't have an account? <a href="/Register">Sign Up</a>
                      </p>
                      <p>
                        <a href="#">Forgot Password</a>
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

export default Login;
