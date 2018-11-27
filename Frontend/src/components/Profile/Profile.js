import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import DatePicker from "react-datepicker";
import moment from "moment";
import Dropzone from "react-dropzone";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { connect } from "react-redux";
import { profile } from "../../actions";
const token = localStorage.getItem("token");
const upload = require("superagent");

//create the Navbar Component
class Profile extends Component {
  constructor(props) {
    super(props);
    const {
      fname,
      lname,
      abt,
      city_cntry,
      company,
      school,
      hometown,
      languages,
      gender,
      phone
    } = this.props.location.state;
    this.state = {
      values: [],
      isVisible: false,
      isphotoloaded: false,
      files: [],
      fname: fname,
      lname: lname,
      abt: abt,
      city_cntry: city_cntry,
      company: company,
      school: school,
      hometown: hometown,
      languages: languages,
      gender: gender,
      phone: phone,
      lyp: "#",
      isSCenabled: false,
      profilepic:
        "https://odis.homeaway.com/mda01/7f257b13-2434-404e-b967-285a6b7eca02.2.2",
      profileicon:
        "https://csvcus.homeaway.com/rsrcs/cdn-logos/2.10.3/bce/brand/misc/default-profile-pic.png"
    };
    this.handleLogout = this.handleLogout.bind(this);

    this.fnameChangeHandler = this.fnameChangeHandler.bind(this);
    this.lnameChangeHandler = this.lnameChangeHandler.bind(this);
    this.abtChangeHandler = this.abtChangeHandler.bind(this);
    this.city_cntryChangeHandler = this.city_cntryChangeHandler.bind(this);
    this.companyChangeHandler = this.companyChangeHandler.bind(this);
    this.schoolChangeHandler = this.schoolChangeHandler.bind(this);
    this.hometownChangeHandler = this.hometownChangeHandler.bind(this);
    this.languagesChangeHandler = this.languagesChangeHandler.bind(this);
    this.genderChangeHandler = this.genderChangeHandler.bind(this);
    this.phoneChangeHandler = this.phoneChangeHandler.bind(this);

    this.submitChanges = this.submitChanges.bind(this);
  }

  componentDidMount() {
    axios.defaults.headers.common["Authorization"] = token;
    axios
      .get("http://localhost:3001/photos/profile", {
        params: {
          email: sessionStorage.getItem("email")
        }
      })
      .then(response => {
        //update the state with the response data
        console.log("Image Res : ", response);
        console.log("Image Res.data : ", response.data);
        let imagePreview = "data:image/jpg;base64, " + response.data;
        this.setState({
          profilepic: imagePreview,
          profileicon: imagePreview
        });
      });
  }

  //fname change handler to update state variable with the text entered by the user
  fnameChangeHandler = e => {
    this.setState({
      fname: e.target.value,
      isSCenabled: true
    });
  };

  //lname change handler to update state variable with the text entered by the user
  lnameChangeHandler = e => {
    this.setState({
      lname: e.target.value,
      isSCenabled: true
    });
  };

  //abt change handler to update state variable with the text entered by the user
  abtChangeHandler = e => {
    this.setState({
      abt: e.target.value,
      isSCenabled: true
    });
  };

  //city_cntry change handler to update state variable with the text entered by the user
  city_cntryChangeHandler = e => {
    this.setState({
      city_cntry: e.target.value,
      isSCenabled: true
    });
  };

  //company change handler to update state variable with the text entered by the user
  companyChangeHandler = e => {
    this.setState({
      company: e.target.value,
      isSCenabled: true
    });
  };

  //school change handler to update state variable with the text entered by the user
  schoolChangeHandler = e => {
    this.setState({
      school: e.target.value,
      isSCenabled: true
    });
  };

  //hometown change handler to update state variable with the text entered by the user
  hometownChangeHandler = e => {
    this.setState({
      hometown: e.target.value,
      isSCenabled: true
    });
  };

  //languages change handler to update state variable with the text entered by the user
  languagesChangeHandler = e => {
    this.setState({
      languages: e.target.value,
      isSCenabled: true
    });
  };

  //gender change handler to update state variable with the text entered by the user
  genderChangeHandler = e => {
    this.setState({
      gender: e.target.value,
      isSCenabled: true
    });
  };

  //phone change handler to update state variable with the text entered by the user
  phoneChangeHandler = e => {
    this.setState({
      phone: e.target.value,
      isSCenabled: true
    });
  };

  submitChanges = e => {
    var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();
    // var email = sessionStorage.getItem('email');
    const data = {
      email: sessionStorage.getItem("email"),
      fname: this.state.fname,
      lname: this.state.lname,
      abt: this.state.abt,
      city_cntry: this.state.city_cntry,
      company: this.state.company,
      school: this.state.school,
      hometown: this.state.hometown,
      languages: this.state.languages,
      gender: this.state.gender,
      phone: this.state.phone
    };
    this.props.profile(data, () => {
      alert("Your profile info has been updated!");
    });
    // //set the with credentials to true
    // axios.defaults.withCredentials = true;
    // //make a post request with the user data
    // axios.post("http://localhost:3001/profile", data).then(response => {
    //   console.log("Status Code : ", response.status);
    //   if (response.status === 200) {
    //     this.setState({
    //       authFlag: true
    //     });
    //     window.location.reload();
    //   } else {
    //     this.setState({
    //       authFlag: false
    //     });
    //   }
    // });
  };

  onPreviewDrop = files => {
    this.state.files[0] = files;
    this.setState({
      files: this.state.files[0],
      isphotoloaded: true
    });
  };

  submitPhoto = () => {
    upload
      .post("/photos/profile")
      .attach("files", this.state.files[0])
      .field("email", sessionStorage.getItem("email"))
      .end((err, res) => {
        if (err) console.log(err);
        //alert("File uploaded!");
        window.location.reload();
      });
  };

  //handle logout to destroy the token
  handleLogout = () => {
    localStorage.removeItem("token");
  };

  render() {
    const previewStyle = {
      position: "relative",
      display: "inline",
      left: "37vw",
      bottom: "2.5vw",
      widows: "6vw",
      height: "6vw",
      "max-width": "6vw",
      "max-height": "6vw"
    };
    // const previewStyle = {
    //   display: "inline",
    //   width: 100,
    //   height: 100
    // };

    //if Cookie is set render Logout Button
    let navLogin = null;
    let redirectVar = null;
    if (token) {
      console.log("Able to read token");
      navLogin = (
        <div>
          <div class="header-bce bluefont">
            <div id="hal-home" class="navbar-brand bluefont-home">
              <a href="/home" class="bluefont-home">
                HomeAway
                <span class="sup">&reg;</span>
              </a>
            </div>
          </div>
          <div class="wrappernav-pro bluefont">
            <link
              href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"
              rel="stylesheet"
            />
            <link
              href="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/2.3.1/css/flag-icon.min.css"
              rel="stylesheet"
            />
            <a href="#" class="flag-icon-background flag-icon-us flag inline">
              {"   "}
            </a>
            <a href="#" class="tb bluefont inline">
              Trip Boards
            </a>
            <div class="btn-group inline dropdownnav">
              <div
                class="btn-home inline bluefont"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img src={this.state.profileicon} class="smallimg" />
                {"   "}
                {this.state.fname.concat(
                  " " + this.state.lname.charAt(0) + "."
                )}{" "}
                <span class="glyphicon glyphicon-triangle-bottom smallicon" />
              </div>
              <ul class="dropdown-menu dropdown-menu-right bluefont">
                <li>
                  {" "}
                  <a class="dropdown-item bluefont" href="/inbox">
                    <p class="bluefont">
                      <span class=" glyphicon glyphicon-envelope dropdownicons bluefont" />
                      {"   "}
                      Inbox
                    </p>
                  </a>
                </li>
                <br />
                <li>
                  <a class="dropdown-item" href="/dashboard">
                    <p class="bluefont">
                      <span class="glyphicon glyphicon-briefcase dropdownicons" />{" "}
                      {"   "}
                      Dashboard
                    </p>
                  </a>
                </li>
                <br />
                <li>
                  <a class="dropdown-item" href="/profile">
                    <p class="bluefont">
                      <span class="glyphicon glyphicon-user dropdownicons" />
                      {"   "}
                      My Profile
                    </p>
                  </a>
                </li>
                <br />
                <li>
                  <a class="dropdown-item" href="#">
                    <p class="bluefont">
                      <span class="glyphicon glyphicon-cog dropdownicons" />
                      {"   "} Account
                    </p>
                  </a>
                </li>

                <li role="separator" class="divider dropdownicons" />

                <li>
                  <a
                    class="dropdown-item"
                    href="/home"
                    onClick={this.handleLogout}
                  >
                    <p class="bluefont">
                      <span class="glyphicon glyphicon-log-out dropdownicons" />{" "}
                      {"   "}
                      Logout
                    </p>
                  </a>
                </li>
              </ul>
            </div>
            <a href="/inbox" class="bluefont">
              <span
                class="glyphicon-glyphicon-envelope envelope inline bluefont"
                aria-hidden="true"
              >
                <i class="fa fa-envelope bluefont " aria-hidden="true">
                  {"  "}
                </i>
              </span>
            </a>

            <div class="btn-group userdd bluefont inline dropdownnav">
              <div
                class="btn-home inline bluefont"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Help{" "}
                <span class="glyphicon glyphicon-triangle-bottom smallicon" />
              </div>
              <ul class="dropdown-menu dropdown-menu-right bluefont">
                <li>
                  {" "}
                  <a class="dropdown-item " href="#">
                    <p class="bluefont">
                      {"   "}
                      Visit help center
                    </p>
                  </a>
                </li>
                <li role="separator" class="divider dropdownicons" />

                <li class="dropdown-header travelersfont">
                  <b>Travelers</b>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    <p class="bluefont">
                      {" "}
                      {"   "}
                      How it works
                    </p>
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    <p class="bluefont">
                      {"   "}
                      Security Center
                    </p>
                  </a>
                </li>
                <li role="separator" class="divider dropdownicons" />

                <li class="dropdown-header travelersfont">
                  <b>Home Owners</b>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    <p class="bluefont">
                      {" "}
                      {"   "}
                      How it works
                    </p>
                  </a>
                </li>
                <li>
                  <a
                    class="dropdown-item"
                    href={
                      sessionStorage.getItem("typeofaccount") == "owner"
                        ? "/lyp"
                        : "#"
                    }
                  >
                    <p class="bluefont">
                      {" "}
                      {"   "}
                      List your property
                    </p>
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    <p class="bluefont">
                      {" "}
                      {"   "}
                      Community
                    </p>
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    <p class="bluefont">
                      {" "}
                      {"   "}
                      Discovery Hub
                    </p>
                  </a>
                </li>
                <li role="separator" class="divider dropdownicons" />
                <li class="dropdown-header travelersfont">
                  <b>Property managers</b>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    <p class="bluefont">
                      {" "}
                      {"   "}
                      List your properties
                    </p>
                  </a>
                </li>
              </ul>
            </div>
            <a
              href={
                sessionStorage.getItem("typeofaccount") == "owner"
                  ? "/lyp"
                  : "#"
              }
              class="buttonlyp default bluefont inline"
            >
              List your property
            </a>
            <div class="homeawayimg-pro inline">
              <img src="http://csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/birdhouse-bceheader.svg" />
            </div>
          </div>
          {this.state.isVisible ? (
            <div class="dropdiv bluefont">
              <Dropzone
                className="dropzone"
                accept="image/*"
                onDrop={this.onPreviewDrop}
                multiple="false"
              >
                <center>
                  <h1 className="blackie">Drag or upload your photo </h1>
                  <h4 className="grayie">
                    Remember, owners like to see who they're renting to, so show
                    a photo of your face.
                  </h4>{" "}
                  <br />
                  <button class="bc ">Browse Computer</button>
                </center>
              </Dropzone>
              {this.state.files.length > 0 && (
                <Fragment class="frag">
                  {/* {this.state.files.map(file => ( */}
                  <img
                    alt="Preview"
                    key={this.state.files[0].preview}
                    src={this.state.files[0].preview}
                    style={previewStyle}
                  />
                  {/* ))} */}
                </Fragment>
              )}
            </div>
          ) : null}
          {this.state.isphotoloaded ? (
            <button class="save bluefont" onClick={this.submitPhoto}>
              Save photo
            </button>
          ) : null}
          <center>
            <div class="usericon">
              <div class="img-circle ">
                <img class="user-photo" src={this.state.profilepic} />
              </div>
              {/* {!this.state.show && <Child />}{" "} */}
              <button
                class=" photobuttonlyp bluefont photobtn"
                onClick={() =>
                  this.setState({
                    isVisible: !this.state.isVisible
                  })
                }
              >
                <span class="glyphicon glyphicon-pencil editicon" />
              </button>

              <h2 class="headup locationname">
                {this.state.fname.concat(" " + this.state.lname)}
              </h2>
            </div>
          </center>
          <div class="detailssec">
            <div class="profileinfo">
              {" "}
              <span>
                <link
                  href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css"
                  rel="stylesheet"
                />
                <h3 class="headup profilehead">Profile Information</h3>
                <a href="#" class="fbbtnimport">
                  Import <i id="icon" class=" fa fa-facebook" />
                </a>
              </span>
              <br />
              <div>
                <input
                  id="fname"
                  value={this.state.fname}
                  onChange={this.fnameChangeHandler}
                  type="text"
                  class="borderbox profiletext"
                  name="fname"
                  placeholder="First Name"
                />
              </div>
              <div>
                <input
                  id="lname"
                  value={this.state.lname}
                  onChange={this.lnameChangeHandler}
                  type="text"
                  class="borderbox profiletext"
                  name="lname"
                  placeholder="Last Name"
                />
                <div>
                  <textarea
                    id="abt"
                    value={this.state.abt}
                    onChange={this.abtChangeHandler}
                    class="borderbox abtme"
                    name="abt"
                    placeholder="About me"
                  />
                </div>
                <div>
                  <input
                    id="city_cntry"
                    value={this.state.city_cntry}
                    onChange={this.city_cntryChangeHandler}
                    type="text"
                    class="borderbox profiletext"
                    name="city_cntry"
                    placeholder="My city, country"
                  />
                </div>
                <div>
                  <input
                    id="company"
                    value={this.state.company}
                    onChange={this.companyChangeHandler}
                    type="text"
                    class="borderbox profiletext"
                    name="company"
                    placeholder="Company"
                  />
                </div>
                <div>
                  <input
                    id="school"
                    value={this.state.school}
                    onChange={this.schoolChangeHandler}
                    type="text"
                    class="borderbox profiletext"
                    name="school"
                    placeholder="School"
                  />
                </div>
                <div>
                  <input
                    id="hometown"
                    value={this.state.hometown}
                    onChange={this.hometownChangeHandler}
                    type="text"
                    class="borderbox profiletext"
                    name="hometown"
                    placeholder="Hometown"
                  />
                </div>
                <div>
                  <input
                    id="languages"
                    value={this.state.languages}
                    onChange={this.languagesChangeHandler}
                    type="text"
                    class="borderbox profiletext"
                    name="languages"
                    placeholder="Languages"
                  />
                </div>
                <div>
                  <select
                    id="gender"
                    name="gender"
                    class="borderbox profiletext"
                    value={this.state.gender}
                    onChange={this.genderChangeHandler}
                  >
                    <option value="gender" disabled selected>
                      Gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <div class="disc">
                    {" "}
                    <img
                      class="lockicon"
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAR+SURBVGhD7VhdTxRXGKbaGzWm7V9oL5om3ugfoElhdxFEYzTxxia9qCZNWxLwotXEJTbtzOxCjRETNbFpS0LK3tjabtH0w1ZgZvlKgOWjRqil4EcNu0hMRIHd4/ucPbO7yCn04MzsmvIkTzi873nPeZ4zZ87MbMk6VoDfMHf4dOuYXzfP+TXre07eNo8iJ7oVJ0pPXn2ZBNcTJ/y6xVYk+lBf1IjywmN/JLLRp1l1dAWS+WIptkhib9GV6OWkNo/l9aH4NP2txRhiuMIAK0riLtvCfLqZov9byzVz175Gc5PolgVifsOqJtMR9M0ZstrK9N6XRDdvgYlJQNwWQwb6AlrndpFeFeiLGrseY3luBluBtsWVPBOtsiuwGqqCvZtRmzfOZU+3mU+PHbEnJ0PflDD2gkipg2qfMlMnMu6iUmt/hW7cBJ9YM3uwqiK1ZmCMzKGAMa2EJ6cZjk2+cnSzqtwTqwFj0cKkxdhBEXYPdOn/4iuHLeUwMCY3QnOIkDvAUzljgkjHqAg7Bp/Rucce38mrvQyZ1w6+YotrOaVWA8a0ny8010ci7DxoD5/PTGLeFiHH4dPMO2KxzoqQ86AJLmESnFYi5DiypxfNJULOg1arPbNaZrsIOQ4v5lg3ogJX58CTtvzTzm20fzMviRr91cwylyheRM045nzmpzz/ztCtd6pCXfie4E/cwtBMV4VjPdASDLINQt5/QyDU8VplODZS1dC10NB2k/38xyyL351nN++nPeUQzfnT6CyDBmiBpre07leFzJVRpltvVISs+zXNI/MYSDZBIThw+zGraR6ehza/0fG6kCtHtdGxdWc4NlHXMjo/PpOSDlhIjidTDNqgsTzcv0XIXg56f6rfd6rn8fXpRelAxcDRewtsL2kMGLHjQvZSlAavvlgZsmabrbvSAYqJX3XeYTtJq/Rrkr4z3qwwrNTwP87cFxf7p9n7Xw+zXQ1dnGgjJuuryiHSGNCtdMAwS4X8HOiYO3ygqW9OVqjKz69MsIBhsSORcdbUnuCspTZNTrm/pTWqPHC6d46O5HeF/Bzw2nz4wuAzG/m2P8EFnyHxP46llxCGkPtuICGtVSG0Sr8kYeTQF4OPZEUqxBaqo9V/2oTN2tZx9gH1kdWqEFrpLUAT8nNwygjuB6y8zASIXHVjt7RWha4b2XOyhzVd+3cjp69N8z6yWhW6buTD5pEVtxZy9NYgrVWh60ai8SSrCMXoZk8uM4EDALlofEZaq0LXjYBnfpnkgj+JTmVNnPhhKmPw10lpjSo9MQJ+HLnOalpuZI2gjZis71romZFDF+LsRHQyd0WojZis71roiZE/iThi808v+9hFTlajSk+M9E3N8a+7lv6HWSNoI4acrEaVnhi5NJBkleEuFr2RyhpBGzHkZDWq9MTI+d+m2NtnB7MmbB48N8hzshpVemKk/uJY3o8HS4mcrEaVnhj5fewBaxuakRI5WY0qPTHiBdeNFBv/H0Z2N3YvvPfl0MPngdAqNYJfUfy6qT9P9H1mBoT8dRQZSkqeAMldhLCZGJJtAAAAAElFTkSuQmCC"
                    />
                    <span class="grayie">
                      {"  "}
                      This is never shared
                    </span>
                  </div>
                  <span>
                    <label class="switch">
                      <input type="checkbox" />
                      <span class="slider round" />
                    </label>
                    <h4 class="head4 sendtexts">
                      <b>Send me texts about my bookings</b>
                    </h4>
                    <h5 class="head5 sendtexts">
                      Only available for mobile phones in select countries.
                      Standard messaging rates apply. <br />
                      See <a class="terms">terms and conditions</a> and{" "}
                      <a class="terms">privacy policy</a>.
                    </h5>
                  </span>
                </div>
                <div class="phone borderbox profiletext">
                  {" "}
                  <link
                    href="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/2.3.1/css/flag-icon.min.css"
                    rel="stylesheet"
                  />
                  <div class="flag2">
                    <div class="flag-icon-background flag-icon-us flag2m inline">
                      {"   "}
                    </div>
                  </div>
                  <img
                    class="arrow"
                    src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU5LjQxNCA1OS40MTQiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDU5LjQxNCA1OS40MTQ7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiPgo8Zz4KCTxwb2x5Z29uIHN0eWxlPSJmaWxsOiM0OEEwREM7IiBwb2ludHM9IjI5LjcwNyw0NS4yNjggMCwxNS41NjEgMS40MTQsMTQuMTQ2IDI5LjcwNyw0Mi40MzkgNTgsMTQuMTQ2IDU5LjQxNCwxNS41NjEgICIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo="
                  />
                  <input
                    id="phone"
                    type="text"
                    class=" phonebox"
                    name="phone"
                    value={this.state.phone}
                    onChange={this.phoneChangeHandler}
                    placeholder="Phone"
                  />
                  <a href="#" class="bluefont aapn">
                    Add another phone number
                  </a>
                  <div class="cntrycode">+1</div>
                </div>
              </div>
              <div>
                <button
                  disabled={!this.state.isSCenabled}
                  class="savechangesbutton"
                  onClick={this.submitChanges}
                >
                  Save changes
                </button>
              </div>
            </div>

            <div class="rightbar">
              <div class="borderbox verif">
                <h3 class="headup">Verifications</h3>

                <h4 class="head4">Email Address</h4>
                <h5 class="head5">
                  We've sent a verification email to{" "}
                  {sessionStorage.getItem("email")}
                </h5>
                <a href="#" class="resend bluefont">
                  Resend email
                </a>
                <br />
                <br />
                <hr class="hr2" />
                <h4 class="head4">Social Account Verifications</h4>

                <h5 class="head5">
                  Verifying one or more social accounts improves your
                  trustworthiness to owners. We'll never post anything without
                  your permission.
                </h5>
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
                  <div class="button2">
                    <a href="#" class="button2 button facebook">
                      <span class="fbbtn2">
                        <i class="fa fa-facebook fbbtn2" />
                      </span>
                      <p class="fbbtntext">Log in with Facebook</p>
                    </a>
                  </div>
                </div>

                <div class="google-btn2">
                  <a href="#" id="googlea">
                    <link
                      rel="stylesheet"
                      type="text/css"
                      href="//fonts.googleapis.com/css?family=Open+Sans"
                    />
                    <div class="google-icon-wrapper2">
                      <img
                        class="google-icon2"
                        src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                      />
                    </div>
                    <p class="btn-text2">Log in with Google</p>
                  </a>
                </div>

                <br />
                <br />
              </div>
              <div class="borderbox vp">
                <a href="#">
                  <button class="buttonlyp vpbtn">
                    <p class="bluefont">View profile</p>
                  </button>
                </a>
              </div>
              <div class="borderbox helptips">
                <center>
                  <img
                    class="usericonimg bluefont"
                    src="data:image/png;base64,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"
                  />
                  <h3 class="headup ">Helpful Tips</h3>
                  <br />
                </center>
                <ul class="ultips">
                  <li>
                    <h4 class="head4">
                      <span class="listno">1</span>
                      Add a photo of yourself
                      <br />
                    </h4>
                  </li>
                  <li>
                    <h4 class="head4">
                      <span class="listno">2</span>
                      Verify your identity
                    </h4>
                  </li>
                  <li>
                    <h4 class="head4">
                      <span class="listno">3</span>
                      Describe your interests, hobbies, <br />
                      <span class="rightmove"> and why you like to travel</span>
                    </h4>
                  </li>
                </ul>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
              </div>
              <br />
              <br />
              <br />
            </div>
          </div>
        </div>
      );
    } else {
      navLogin = <Redirect to="/login" />;
    }
    document.body.style.backgroundColor = "white";

    return (
      <div>
        {/* {redirectVar} */}
        {navLogin}
      </div>
    );
  }
}

// export default Profile;
export default connect(
  null,
  { profile }
)(Profile);
