import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { loginOwner } from "../../actions";

//Define a ownerLogin Component
class ownerLogin extends Component {
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
  renderEField(field) {
    const {
      meta: { touched, error }
    } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div className={className}>
        <input
          className="form-control"
          type="email"
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
    this.props.loginOwner(values, res => {
      sessionStorage.setItem("typeofaccount", "owner");
      sessionStorage.setItem("email", values.email);
      localStorage.setItem("token", res);
      window.location.reload();
      this.props.history.push("/home");
    });
  }

  render() {
    const { handleSubmit } = this.props;
    //redirect based on successful login
    let redirectVar = null;
    if (localStorage.getItem("token")) redirectVar = <Redirect to="/home" />;
    document.body.style.backgroundColor = "rgb(242,242,242)";
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div class="header-bce bluefont logo">
          <div id="hal" class="navbar-brand">
            <a href="/home" id="hal">
              HomeAway
              <span class="sup">&reg;</span>
            </a>
          </div>
          <div class="homeawayimg">
            <img src="http://csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/birdhouse-bceheader.svg" />
          </div>
        </div>
        <br />
        <br />
        <br />
        <div id="wrapper">
          <div class="ownerimage">
            <img src="https://csvcus.homeaway.com/rsrcs/stab-cms-resources/0.10.35/images/cas/login-banner-sept16-1.png" />
          </div>
          <div class="ownerform">
            {redirectVar}
            <div class="container">
              <div class="login-form">
                <div class="main-div">
                  <div align="left" class="helvetica account" font-weight="100">
                    Owner login
                    <div class="hrtagdiv" />
                  </div>
                  <Field
                    label="Email"
                    name="email"
                    component={this.renderEField}
                  />

                  <div class="form-group">
                    <Field
                      label="Password"
                      name="password"
                      component={this.renderPField}
                    />

                    <br />
                    <div align="left">
                      <a href="#">Forgot password?</a>
                    </div>
                  </div>
                  <div>
                    <button type="submit" class="btn btn-primary">
                      Log In
                    </button>
                  </div>
                  <div align="left" class="kmsi">
                    <input type="checkbox" value="keepSignedIn" /> {"  "}
                    Keep me signed in
                    <br />
                    <br />
                  </div>
                  <div class="hrtagdiv orhr" />

                  <p class="disclaimer">
                    Want to list your property? <a href="#">Learn more</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <br />
        </div>
        <br />
        <div class="disclaimer2">
          Use of this Web site constitutes acceptance of the HomeAway.com{" "}
          <a href="https://www.homeaway.com/info/about-us/legal/terms-conditions">
            Terms and Conditions
          </a>{" "}
          and{" "}
          <a href="https://www.homeaway.com/info/about-us/legal/privacy-policy">
            Privacy Policy
          </a>
          .<br /> ©2018 HomeAway. All rights reserved.
        </div>
      </form>
    );
  }
}
//export ownerLogin Component
//export default ownerLogin;
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
    { loginOwner }
  )(ownerLogin)
);
