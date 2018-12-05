import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { loginUser } from "../../actions";

//Define a Login Component
class Login extends Component {
  
  renderField(field) {
    const {
      meta: { touched, error }
    } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div className={className}>
        <input
          className="form-control"
          type="text"
          {...field.input}
          placeholder={field.label}
        />
        <div className="text-help red">{touched ? error : ""}</div>
      </div>
    );
  }
  renderPField(field) {
    const {
      meta: { touched, error }
    } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div className={className}>
        <input
          className="form-control"
          type="password"
          {...field.input}
          placeholder={field.label}
        />
        <div className="text-help red">{touched ? error : ""}</div>
      </div>
    );
  }

  onSubmit(values) {
    console.log(values);
    this.props.loginUser(values, res => {
      sessionStorage.setItem("typeofaccount", "owner");
      sessionStorage.setItem("email", values.email);
      localStorage.setItem("token", res);
      window.location.reload();
      //this.props.history.push("/home");
      this.props.history.go(-1)
    });
  }

  render() {
    const { handleSubmit } = this.props;

    //redirect based on successful login
    let redirectVar = null;
    if (localStorage.getItem("token")) {
      redirectVar = <Redirect to="/home" />;
    }
    document.body.style.backgroundColor = "rgb(242,242,242)";
    return (
      <div >
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div class="header-bce-home_New bluefont-home">
          <div id="hal" class="navbar-brand bluefont-home">
            <a href="/home" id="hal" class="bluefont-home">
              Bloquity
                <span class="sup">&reg;</span>
              </a>
            </div>
            <div class="homeawayimg">
              <img src="https://i.imgur.com/fLTMlTI.png"/>
            </div>

            
          </div>
          <div>
            <div align="center" class="helvetica ">
              {" "}
              <br />
              <h1>Log in to Bloquity</h1>
              <h3 color="rgb(143, 137, 137)">
                Not on Bloquity yet?{" "}
                <a href="http://localhost:3000/SignUp"> Sign up now!</a>
              </h3>
            </div>
            <div>
              {redirectVar}
              <div class="container">
                <div class="login-form">
                  <div class="main-div">
                    <div
                      align="left"
                      class="helvetica account"
                      font-weight="100"
                    >
                      Account login
                      <div class="hrtagdiv" />
                    </div>
                    <Field
                      label="Email"
                      name="email"
                      component={this.renderField}
                    />

                    <Field
                      label="Password"
                      name="password"
                      component={this.renderPField}
                    />

                    <div class="orangebuttonhover">
                      <button
                        type="submit"
                        class="btn btn-primary orangebuttonhover"
                      >
                        Log In
                      </button>
                    </div>
                    <div align="left" class="disclaimer">
                      <input type="checkbox" value="keepSignedIn" /> {"  "}
                      Keep me signed in
                      <br />
                    </div>
                    <div class="hrtagdiv orhr">
                      <span class="hrtagspan">
                        <i>or</i>
                      </span>
                    </div>
                    <div class="pad50 ">
                      <link
                        href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
                        rel="stylesheet"
                        integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
                        crossorigin="anonymous"
                      />
                      <link
                        href="https://netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.css"
                        rel="stylesheet"
                      />

                      <link
                        href="https://fonts.googleapis.com/css?family=Inconsolata:400,700"
                        rel="stylesheet"
                        type="text/css"
                      />
                      <a href="#" class="button facebook">
                        <span>
                          <i class="fa fa-facebook" aria-hidden="true" />
                        </span>
                        <p>Log in with Facebook</p>
                      </a>
                    </div>

                    <div class="google-btn">
                      <a href="#" id="googlea">
                        <link
                          rel="stylesheet"
                          type="text/css"
                          href="//fonts.googleapis.com/css?family=Open+Sans"
                        />
                        <div class="google-icon-wrapper">
                          <img
                            class="google-icon"
                            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                          />
                        </div>
                        <p class="btn-text">Log in with Google</p>
                      </a>
                    </div>
                    <p class="disclaimer">
                      We don't post anything without your permission.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div class="disclaimer2">
              Use of this Web site constitutes acceptance of the Bloquity.com{" "}
              <a href="#">
                Terms and Conditions
              </a>{" "}
              and{" "}
              <a href="#">
                Privacy Policy
              </a>
              .<br /> ©2018 Bloquity. All rights reserved.
              <br />
              <br />
              <br />
              <br />
            </div>
          </div>
        </form>
      </div>
    );
  }
}
//export Login Component
function validate(values) {
  const errors = {};

  // Validate the inputs from 'values'
  if (!values.email) {
    errors.email = "Enter email";
  }
  if (!values.password) {
    errors.password = "Enter password";
  }

  // If errors is empty, the form is fine to submit
  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}

export default reduxForm({
  validate,
  form: "LoginUserForm"
})(
  connect(
    null,
    { loginUser }
  )(Login)
);
