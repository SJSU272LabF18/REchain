import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { signUp } from "../../actions";

//Define a Login Component
class SignUp extends Component {
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

  renderRField(field) {
    const {
      meta: { touched, error }
    } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div className={className}>
        <input type="radio" {...field.input} value="traveler" />
        {"   "}
        Traveler
        {"  "}
        <input type="radio" {...field.input} value="owner" />
        {"   "}
        Owner
        <div className="text-help red">{touched ? error : ""}</div>
      </div>
    );
  }

  onSubmit(values) {
    console.log(values);
    this.props.signUp(values, () => {
      this.props.history.push("/login");
    });
  }

  render() {
    //redirect based on successful login
    const { handleSubmit } = this.props;
    let redirectVar = null;

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
        <div>
          <div align="center" class="helvetica ">
            {" "}
            <br />
            <h1>Sign up for HomeAway</h1>
            <h4 color="rgb(143, 137, 137)">
              Already have an account?{" "}
              <a href="http://localhost:3000/login"> Log in</a>
            </h4>
          </div>
          <div>
            {redirectVar}
            <div class="container">
              <div class="login-form">
                <div class="main-div">
                  <Field
                    label="First Name"
                    name="fname"
                    component={this.renderField}
                  />

                  <Field
                    label="Last Name"
                    name="lname"
                    component={this.renderField}
                  />

                  <Field
                    label="Email"
                    name="email"
                    component={this.renderEField}
                  />

                  <Field
                    label="Password"
                    name="password"
                    component={this.renderPField}
                  />

                  <div align="left">
                    <Field
                      label="Type Of Account"
                      name="typeofaccount"
                      component={this.renderRField}
                    />

                    <br />
                  </div>
                  <div>
                    <button type="submit" class="btn btn-primary">
                      Sign Up
                    </button>
                  </div>
                  <br />
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
                  <br />
                  <p class="disclaimer2">
                    By creating an account you are accepting our{" "}
                    <a href="https://www.homeaway.com/info/about-us/legal/terms-conditions">
                      Terms and Conditions
                    </a>{" "}
                    and{" "}
                    <a href="https://www.homeaway.com/info/about-us/legal/privacy-policy">
                      Privacy Policy
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
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
            <br />
            <br />
            <br />
            <br />
          </div>
        </div>
      </form>
    );
  }
}
//export Login Component
//export default SignUp;

function validate(values) {
  const errors = {};

  // Validate the inputs from 'values'
  if (!values.email) {
    errors.email = "Email is required";
  }
  if (!values.password) {
    errors.password = "Password is required";
  }
  if (!values.fname) {
    errors.fname = "First Name is required";
  }
  if (!values.lname) {
    errors.lname = "Last Name is required";
  }
  if (!values.typeofaccount) {
    errors.typeofaccount = "Please specify if you are a Traveler or an Owner";
  }

  // If errors is empty, the form is fine to submit
  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}

export default reduxForm({
  validate,
  form: "SignUpForm"
})(
  connect(
    null,
    { signUp }
  )(SignUp)
);
