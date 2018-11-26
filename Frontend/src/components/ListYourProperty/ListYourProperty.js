import React, { Component, Fragment } from "react";
import "../../App.css";
import axios from "axios";
import { Redirect } from "react-router";
import DatePicker from "react-datepicker";
import Dropzone from "react-dropzone";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { connect } from "react-redux";
import { lyp } from "../../actions";
const upload = require("superagent");
const token = localStorage.getItem("token");
const today = new Date().toISOString().slice(0, 10);

//Define a Login Component
class ListYourProperty extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      fname: "",
      lname: "",
      country: "",
      streetaddr: "",
      unit: "",
      city: "",
      state: "",
      zip: "",
      headline: "",
      propdesc: "",
      proptype: "Apartment",
      rooms: "",
      bathrooms: "",
      accomodates: "",
      sqft: "",
      yearbuilt: "",
      parking: "",

      //startdate: "",
      //enddate: "",
      //nbr: "",
      pricing: "",
      //minstay: "",
      cf: "",
      activelocation: "",
      files: [],
      isphotosaved: false,
      isLocationComplete: false,
      isDetailsComplete: false,
      isPhotosComplete: false,
      isPricingComplete: false,
      propertyadded: true,
      isFormValid: false,
      profileicon:
        "https://csvcus.homeaway.com/rsrcs/cdn-logos/2.10.3/bce/brand/misc/default-profile-pic.png"
    };

    //Bind the handlers to this class
    this.countryChangeHandler = this.countryChangeHandler.bind(this);
    this.streetaddrChangeHandler = this.streetaddrChangeHandler.bind(this);
    this.unitChangeHandler = this.unitChangeHandler.bind(this);
    this.cityChangeHandler = this.cityChangeHandler.bind(this);
    this.stateChangeHandler = this.stateChangeHandler.bind(this);
    this.zipChangeHandler = this.zipChangeHandler.bind(this);
    this.headlineChangeHandler = this.headlineChangeHandler.bind(this);
    this.propdescChangeHandler = this.propdescChangeHandler.bind(this);
    this.proptypeChangeHandler = this.proptypeChangeHandler.bind(this);

    this.roomsChangeHandler = this.roomsChangeHandler.bind(this);
    this.accomodatesChangeHandler = this.accomodatesChangeHandler.bind(this);
    this.sqftChangeHandler = this.sqftChangeHandler.bind(this);
    this.yearBuiltChangeHandler = this.yearBuiltChangeHandler.bind(this);
    this.parkingChangeHandler = this.parkingChangeHandler.bind(this);
    this.bathroomsChangeHandler = this.bathroomsChangeHandler.bind(this);
    // this.startdateChangeHandler = this.startdateChangeHandler.bind(this);
    //this.enddateChangeHandler = this.enddateChangeHandler.bind(this);
    //this.nbrChangeHandler = this.nbrChangeHandler.bind(this);
    this.pricingChangeHandler = this.pricingChangeHandler.bind(this);
    this.cfChangeHandler = this.cfChangeHandler.bind(this);
    // this.minstayChangeHandler = this.minstayChangeHandler.bind(this);
  }
  componentDidMount() {
    document.title = "Bloquity";

    if (localStorage.getItem("token")) {
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
          let imagePreview = "data:image/jpg;base64, " + response.data;
          this.setState({
            profileicon: imagePreview
          });
        });
    }
    if (localStorage.getItem("token")) {
      axios.defaults.headers.common["Authorization"] = token;
      axios
        .get("http://localhost:3001/home", {
          params: {
            email: sessionStorage.getItem("email")
          }
        })
        .then(response => {
          //update the state with the response data
          console.log("Data  : ", response);
          this.setState({
            fname: response.data.fname,
            lname: response.data.lname
          });
        });
    }
  }

  onPreviewDrop = files => {
    if (this.state.files.length < 5) {
      this.setState({ files: this.state.files.concat(files) });
      if (this.state.files.length > 1) {
        this.setState({ isPhotosComplete: true });
      }
    } else alert("Maximum number of photos is 5!");
  };

  // nbrChangeHandler = e => {
  //   const name = e.target.name;
  //   this.setState({
  //     [name]: e.target.value
  //   });
  //   this.showInputError("nbr");
  //   this.showFormErrors();
  // };

  pricingChangeHandler = e => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value
    });
    this.showInputError("pricing");
    this.showFormErrors();
  };

  cfChangeHandler = e => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value
    });
  };

  // minstayChangeHandler = e => {
  //   const name = e.target.name;
  //   this.setState({
  //     [name]: e.target.value
  //   });
  //   this.showInputError("minstay");
  //   this.showFormErrors();
  // };

  accomodatesChangeHandler = e => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value
    });
    this.showInputError("accomodates");
    this.showFormErrors();
  };

  sqftChangeHandler = e => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value
    });
    this.showInputError("sqft");
    this.showFormErrors();
  };

  yearBuiltChangeHandler = e => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value
    });
    this.showInputError("yearbuilt");
    this.showFormErrors();
  };

  parkingChangeHandler = e => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value
    });
    this.showInputError("parking");
    this.showFormErrors();
  };

  // startdateChangeHandler = e => {
  //   const name = e.target.name;
  //   this.setState({
  //     [name]: e.target.value
  //   });
  //   this.showInputError("startdate");
  //   this.showFormErrors();
  // };

  // enddateChangeHandler = e => {
  //   const name = e.target.name;
  //   this.setState({
  //     [name]: e.target.value
  //   });
  //   this.showInputError("enddate");
  //   this.showFormErrors();
  // };

  bathroomsChangeHandler = e => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value
    });
    this.showInputError("bathrooms");
    this.showFormErrors();
  };

  roomsChangeHandler = e => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value
    });
    this.showInputError("rooms");
    this.showFormErrors();
  };

  propdescChangeHandler = e => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value
    });
    this.showInputError("propdesc");
    this.showFormErrors();
  };

  proptypeChangeHandler = e => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value
    });
  };

  countryChangeHandler = e => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value
    });
    this.showInputError("country");
    this.showFormErrors();
  };

  streetaddrChangeHandler = e => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value
    });
    this.showInputError("streetaddr");
    this.showFormErrors();
  };

  unitChangeHandler = e => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value
    });

    this.showInputError("unit");
    this.showFormErrors();
  };

  cityChangeHandler = e => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value
    });

    this.showInputError("city");
    this.showFormErrors();
  };

  stateChangeHandler = e => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value
    });

    this.showInputError("state");
    this.showFormErrors();
  };

  zipChangeHandler = e => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value
    });

    this.showInputError("zip");
    this.showFormErrors();
  };

  headlineChangeHandler = e => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value
    });
    this.showInputError("headline");
    this.showFormErrors();
  };

  showFormErrors() {
    if (
      !this.showInputError("country") ||
      !this.showInputError("streetaddr") ||
      !this.showInputError("city") ||
      !this.showInputError("state") ||
      !this.showInputError("zip") ||
      !this.showInputError("unit")
    ) {
      this.setState({ isLocationComplete: false });
    } else this.setState({ isLocationComplete: true });

    if (
      !this.showInputError("headline") ||
      !this.showInputError("propdesc") ||
      !this.showInputError("rooms") ||
      !this.showInputError("bathrooms") ||
      !this.showInputError("sqft") ||
      !this.showInputError("yearbuilt") ||
      !this.showInputError("parking")
    ) {
      this.setState({ isDetailsComplete: false });
    } else this.setState({ isDetailsComplete: true });

    if (
      //!this.showInputError("startdate") ||
      // !this.showInputError("enddate") ||
      //!this.showInputError("nbr") ||
      !this.showInputError("pricing")
      //!this.showInputError("minstay")
    ) {
      this.setState({ isPricingComplete: false });
    } else this.setState({ isPricingComplete: true });
  }

  showInputError(refName) {
    const validity = this.refs[refName].validity;
    const label = document.getElementById(`${refName}Label`).textContent;
    const error = document.getElementById(`${refName}Error`);
    const isStreetAddr = refName.indexOf("streetaddr") !== -1;
    const isHeadline = refName.indexOf("headline") !== -1;
    const isPropDesc = refName.indexOf("propdesc") !== -1;

    if (!validity.valid) {
      if (validity.valueMissing) {
        error.textContent = `${label} is a required field`;
      } else if (isStreetAddr && validity.patternMismatch) {
        error.textContent = `Please include a number for ${label} `;
      } else if (isHeadline && validity.patternMismatch) {
        error.textContent = `${label} should have minimum 20 and maximum 80 characters.`;
      } else if (isPropDesc && validity.patternMismatch) {
        error.textContent = `${label} should have minimum 40 and maximum 1000 characters.`;
      }

      return false;
    }

    error.textContent = "";
    return true;
  }

  addProperty = e => {
    var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();
    // var apa;
    // if (document.getElementById("apano").checked) {
    //   apa = "no";
    // } else if (document.getElementById("apayes").checked) {
    //   apa = "yes";
    // }
    var cf;
    if (this.state.cf == "") cf = 0;
    else cf = this.state.cf;
    // var email = sessionStorage.getItem('email');
    const data = {
      email: sessionStorage.getItem("email"),
      country: this.state.country,
      streetaddr: this.state.streetaddr,
      unit: this.state.unit,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      headline: this.state.headline,
      propdesc: this.state.propdesc,
      proptype: this.state.proptype,
      rooms: this.state.rooms,
      bathrooms: this.state.bathrooms,
      //accomodates: this.state.accomodates,
      sqft: this.state.sqft,
      year_built: this.state.year_built,
      parking: this.state.parking,
      price: this.state.pricing,
      // startdate: this.state.startdate,
      // enddate: this.state.enddate,
      //nbr: this.state.nbr,
      // minstay: this.state.minstay,
      //cf: cf,
      //apa: apa,
      fname: this.state.fname,
      lname: this.state.lname
    };

    this.props.lyp(data, response => {
      // this.submitPhoto();
      console.log("LYPPPPP", response._id);
      this.submitPhoto(response._id);
      alert("Property Added!");
    });
  };

  submitPhoto = _id => {
    if (this.state.files.length > 1) {
      this.state.files.forEach(file => {
        upload
          .post("/photos/property")
          .field("_id", _id)
          .attach("file", file)
          .end((err, res) => {
            if (err) console.log(err);
          });
      });
      this.setState({
        isphotosaved: true,
        isPhotosComplete: true
      });
      alert("Property added!");
    } else alert("2 photos are mandatory!");
  };

  handleLogout = () => {
    localStorage.removeItem("token");
  };

  render() {
    const previewStyle = {
      position: "relative",
      display: "inline",
      left: "5vw",
      bottom: "0.5vw",
      "max-width": "5vw",
      "max-height": "3vw"
    };
    //redirect based on successful login
    let redirectVar = null;
    let navLogin = null;
    if (
      localStorage.getItem("token") &&
      sessionStorage.getItem("typeofaccount") == "owner"
    ) {
      document.body.style.backgroundColor = "rgb(242,242,242)";
      navLogin = (
        <form novalidate>
          <div class="header-bce bluefont">
            <div id="hal-home" class="navbar-brand bluefont-home">
              <a href="/home" class="bluefont-home">
                Bloquity
                <span class="sup">&reg;</span>
              </a>
            </div>
          </div>
          <div class="wrappernav-pro bluefont">
            <link
              href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"
              rel="stylesheet"
            />
            {/* <link
              href="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/2.3.1/css/flag-icon.min.css"
              rel="stylesheet"
            /> */}
            <a href="#" class="flag-icon-background flag-icon-us flag inline">
              {"   "}
            </a>
            {/* <a href="#" class="tb bluefont inline">
              Trip Boards
            </a> */}
            <div class="btn-group inline dropdownnav">
              <div
                class="btn-home inline bluefont"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img src={this.state.profileicon} class="smallimg" />
                {"   "}
                {this.state.fname} {String(this.state.lname).charAt(0) + "."}{" "}
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
                  <a class="dropdown-item" href="/lyp">
                    <p class="bluefont">
                      {" "}
                      {"   "}
                      List your properties
                    </p>
                  </a>
                </li>
              </ul>
            </div>
            <button class="buttonlyp default bluefont inline">
              List your property
            </button>
            {/* <div class="homeawayimg-pro inline">
              <img src="http://csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/birdhouse-bceheader.svg" />
            </div> */}
          </div>
          <div class="lypstuff">
            <link
              rel="stylesheet"
              href="http://netdna.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css"
            />
            <link rel="stylesheet" href="bootstrap.vertical-tabs.css" />
            {/*required for floating*/}{" "}
            <div>
              {" "}
              {/*Navs*/}
              <ul class="nav">
                {/* <li>
                  <a class="tabitem" href="#welcome" data-toggle="tab">
                    <p class="tabitem welcome"> Welcome</p>
                  </a>
                </li> */}
                {/* ADDING PROPERTY REQS */}
                <li>
                  <a class="tabitem" href="#location" data-toggle="tab">
                    <p class="tabitem">
                      {" "}
                      {this.state.isLocationComplete ? (
                        <i class="fa fa-check-circle checkpt" />
                      ) : null}
                      Location Details
                    </p>
                  </a>
                </li>
                <li>
                  <a class="tabitem" href="#details" data-toggle="tab">
                    <p class="tabitem">
                      {" "}
                      {this.state.isDetailsComplete ? (
                        <i class="fa fa-check-circle checkpt" />
                      ) : null}{" "}
                      Property Details
                    </p>
                  </a>
                </li>
                <li>
                  <a class="tabitem" href="#photos" data-toggle="tab">
                    <p class="tabitem">
                      {" "}
                      {this.state.isPhotosComplete ? (
                        <i class="fa fa-check-circle checkpt" />
                      ) : null}
                      Photos
                    </p>
                  </a>
                </li>
                {/* <li>
                  <a class="tabitem" href="#pricing" data-toggle="tab">
                    <p class="tabitem">
                      {" "}
                      {this.state.isPricingComplete ? (
                        <i class="fa fa-check-circle checkpt" />
                      ) : null}
                      Pricing
                    </p>
                  </a>
                </li>{" "} */}
                {!this.state.propertyadded ? (
                  <p class="pa">Property Added!</p>
                ) : null}
                {//this.state.isPricingComplete &&
                this.state.isLocationComplete &&
                this.state.isPhotosComplete &&
                this.state.isDetailsComplete &&
                this.state.propertyadded ? (
                  <li>
                    <button
                      class="savechangesbutton"
                      onClick={this.addProperty}
                    >
                      Add Property
                    </button>
                  </li>
                ) : null}
              </ul>
            </div>
            {/*Tab panes*/}
            <div class="lypforms card">
              <div class="tab-content">
                <div class="tab-pane active" id="welcome">
                  {<h2>POST YOUR PROPERTY HERE!</h2>}
                  {/* <p class="grayie"> Just 4 simple steps.</p> */}
                  {/* <a class="lypcont" href="#location" data-toggle="tab">
                    Continue
                  </a> */}
                </div>
                {/*--------------------------------LOCATION---------------------------------------*/}
                <div class="tab-pane" id="location">
                  <h4 class="h4v">Enter Your Location Details</h4>
                  <hr class="hrlyp" />
                  <div class="locationinfo">
                    <div class="form-group">
                      <label id="countryLabel" hidden>
                        Country
                      </label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        ref="country"
                        class="locationitem borderbox"
                        value={this.state.country}
                        onChange={this.countryChangeHandler}
                        placeholder="Country"
                        required
                      />

                      <div className="error" id="countryError" />
                    </div>
                    <div class="form-group">
                      <label id="streetaddrLabel" hidden>
                        Street Address
                      </label>
                      <input
                        id="streetaddr"
                        value={this.state.streetaddr}
                        onChange={this.streetaddrChangeHandler}
                        type="text"
                        class="borderbox locationitem "
                        name="streetaddr"
                        ref="streetaddr"
                        placeholder="Street Address"
                        pattern=".*[0-9].*"
                        required
                      />

                      <div className="error" id="streetaddrError" />
                    </div>
                    <div class="form-group">
                      <label id="unitLabel" hidden>
                        Unit/Building
                      </label>
                      <input
                        id="unit"
                        value={this.state.unit}
                        onChange={this.unitChangeHandler}
                        type="text"
                        class="borderbox locationitem "
                        name="unit"
                        ref="unit"
                        placeholder="Unit, Suite, Building, Etc."
                      />

                      <div className="error" id="unitError" />
                    </div>
                    <div class="form-group">
                      <label id="cityLabel" hidden>
                        City
                      </label>
                      <input
                        id="city"
                        value={this.state.city}
                        onChange={this.cityChangeHandler}
                        type="text"
                        class="borderbox locationitem "
                        name="city"
                        ref="city"
                        placeholder="City"
                        required
                      />

                      <div className="error" id="cityError" />
                    </div>
                    <div class="form-group">
                      <label id="stateLabel" hidden>
                        State
                      </label>
                      <input
                        id="state"
                        value={this.state.state}
                        onChange={this.stateChangeHandler}
                        type="text"
                        class="borderbox locationitem"
                        name="state"
                        ref="state"
                        placeholder="State"
                        required
                      />
                      <div className="error" id="stateError" />
                    </div>
                    <div class="form-group">
                      <label id="zipLabel" hidden>
                        Zip Code
                      </label>
                      <input
                        id="zip"
                        value={this.state.zip}
                        onChange={this.zipChangeHandler}
                        type="text"
                        class="borderbox locationitem"
                        name="zip"
                        ref="zip"
                        placeholder="Zip Code"
                        required
                      />
                      <div className="error" id="zipError" />
                    </div>
                  </div>
                </div>
                {/*---------------------------------Property DETAILS--------------------------------*/}
                <div class="tab-pane" id="details">
                  <h4 class="h4v">Enter Your Property Details</h4>
                  <hr class="hrlyp" />
                  {/* <p class="grayie">
                    {" "}
                    Start out with a descriptive headline and a detailed summary
                    of your property.
                  </p> */}

                  <div class="detailsinfo">
                    <div class="form-group">
                      <label id="headlineLabel" hidden>
                        Headline
                      </label>
                      <input
                        type="text"
                        id="headline"
                        name="headline"
                        ref="headline"
                        class="locationitem borderbox"
                        value={this.state.headline}
                        onChange={this.headlineChangeHandler}
                        placeholder="Headline"
                        pattern=".{20,80}"
                        minLength="20"
                        maxLength="80"
                        required
                      />
                      <div className="error" id="headlineError" />
                    </div>

                    <div class="form-group">
                      <label id="propdescLabel" hidden>
                        Property Description
                      </label>
                      <textarea
                        id="propdesc"
                        value={this.state.propdesc}
                        onChange={this.propdescChangeHandler}
                        type="text"
                        class="borderbox propdesc"
                        name="propdesc"
                        ref="propdesc"
                        placeholder="Property Description"
                        required
                        maxLength="1000"
                      />
                      <div className="error" id="propdescError" />
                    </div>
                    <div class="borderbox detailsitem2">
                      {" "}
                      <label id="proptypeLabel">Property Type</label>
                      <div class=" form-group ">
                        <select
                          type="text"
                          id="proptype"
                          name="proptype"
                          ref="proptype"
                          class="detailsitemstep"
                          value={this.state.proptype}
                          onChange={this.proptypeChangeHandler}
                          required
                        >
                          <option class="opt" value="Apartment">
                            Apartment
                          </option>
                          <option value="Barn">Barn</option>
                          <option value="Bed and Breakfast">
                            Bed and Breakfast
                          </option>
                          <option value="Boat">Boat</option>
                          <option value="Bungalow">Bungalow</option>
                          <option value="Cabin">Cabin</option>
                          <option value="Campground">Campground</option>
                          <option value="Castle">Castle</option>
                          <option value="Chalet">Chalet</option>
                          <option value="Chateau / Country House">
                            Chateau / Country House
                          </option>
                          <option value="Condo">Condo</option>
                          <option value="Corporate Apartment">
                            Corporate Apartment
                          </option>
                          <option value="Cottage">Cottage</option>
                          <option value="estate">Estate</option>
                          <option value="Farmhouse">Farmhouse</option>
                          <option value="Guest House">Guest House</option>
                          <option value="Hostel">Hostel</option>
                          <option value="Hotel">Hotel</option>
                          <option value="Hotel Suites">Hotel Suites</option>
                          <option value="House">House</option>
                          <option value="House Boat">House Boat</option>
                          <option value="Lodge">Lodge</option>
                          <option value="Mill">Mill</option>
                          <option value="Mobile Home">Mobile Home</option>
                          <option value="Recreational Vehicle">
                            Recreational Vehicle
                          </option>
                          <option value="Resort">Resort</option>
                          <option value="Studio">Studio</option>
                          <option value="Tower">Tower</option>
                          <option value="Town Home">Town Home</option>
                          <option value="Villa">Villa</option>
                          <option value="Yacht">Yacht</option>
                        </select>
                        <div className="error" id="proptypeError" />
                      </div>
                    </div>
                    <br />
                    <div class="form-group borderbox detailsitem2">
                      <label id="roomsLabel">Bedrooms</label>
                      <input
                        id="rooms"
                        value={this.state.rooms}
                        onChange={this.roomsChangeHandler}
                        type="number"
                        step="1"
                        name="rooms"
                        ref="rooms"
                        class="detailsitemstep"
                        placeholder="0"
                        required
                        min="1"
                      />
                      <div className="error" id="roomsError" />
                    </div>
                    <br />
                    <div class="form-group borderbox detailsitem2">
                      <label id="bathroomsLabel">Bathrooms</label>
                      <input
                        id="bathrooms"
                        value={this.state.bathrooms}
                        onChange={this.bathroomsChangeHandler}
                        type="number"
                        step="0.5"
                        name="bathrooms"
                        ref="bathrooms"
                        class="detailsitemstep"
                        placeholder="0"
                        required
                        min="1"
                      />
                      <div className="error" id="bathroomsError" />
                    </div>
                    <br />
                    <div class="form-group borderbox detailsitem2">
                      <label id="sqftLabel">Sqft of Lot</label>
                      <input
                        id="rooms"
                        value={this.state.sqft}
                        onChange={this.sqftChangeHandler}
                        type="number"
                        step="1"
                        name="sqft"
                        ref="sqft"
                        class="detailsitemstep"
                        placeholder="0"
                        required
                        min="1"
                      />
                      <div className="error" id="sqftError" />
                    </div>
                    <br />
                    <div class="form-group borderbox detailsitem2">
                      <label id="yearbuiltLabel">Year Built</label>
                      <input
                        id="rooms"
                        value={this.state.yearbuilt}
                        onChange={this.yearBuiltChangeHandler}
                        type="number"
                        step="1"
                        name="yearbuilt"
                        ref="yearbuilt"
                        class="detailsitemstep"
                        placeholder="0"
                        required
                        min="1"
                      />
                      <div className="error" id="yearbuiltError" />
                    </div>
                    <br />
                    <div class="form-group borderbox detailsitem2">
                      <label id="pricingLabel">Price of Property ($)</label>

                      <input
                        id="rooms"
                        value={this.state.pricing}
                        onChange={this.pricingChangeHandler}
                        type="number"
                        step="1"
                        name="pricing"
                        ref="pricing"
                        class="detailsitemstep"
                        placeholder="0"
                        required
                        min="1"
                      />
                      <div className="error" id="pricingError" />
                    </div>
                    <br />
                    <div class="form-group borderbox detailsitem2">
                      <label id="parkingLabel">Parking Spots</label>
                      <input
                        id="rooms"
                        value={this.state.parking}
                        onChange={this.parkingChangeHandler}
                        type="number"
                        step="1"
                        name="parking"
                        ref="parking"
                        class="detailsitemstep"
                        placeholder="0"
                        required
                        min="1"
                      />
                      <div className="error" id="parkingError" />
                    </div>
                    <hr />
                    <br />
                  </div>
                </div>
                {/*---------------------------------PHOTOS--------------------------------*/}
                <div class="tab-pane" id="photos">
                  <h1>Add up to 5 photos of your property</h1>
                  <hr />
                  Showcase your property’s best features (no pets or people,
                  please).
                  <div class="dropdiv2 bluefont">
                    <Dropzone
                      className="dropzone2"
                      accept="image/*"
                      onDrop={this.onPreviewDrop}
                      eventHandlers={this.eventHandlers}
                      djsConfig={this.djsConfig}
                    >
                      <center>
                        <h3 className="grayie dph">
                          Drop photos here
                          <br />
                          or
                        </h3>
                        <button class="bc2">SELECT PHOTOS TO UPLOAD</button>
                        <h5 className="grayie">
                          {" "}
                          {this.state.files.length} of 5 uploaded. 2 are
                          required. You can choose to upload more than one photo
                          at a time.
                        </h5>{" "}
                        <br />
                      </center>
                    </Dropzone>
                    {this.state.files.length > 0 && (
                      <Fragment class="frag">
                        {this.state.files.map(file => (
                          <img
                            alt="Preview"
                            key={file.preview}
                            src={file.preview}
                            style={previewStyle}
                          />
                        ))}
                      </Fragment>
                    )}
                  </div>
                  {/* {this.state.isphotosaved ? (
                    <div>
                      <br />
                      Photos saved!
                    </div>
                  ) : null}
                  {!this.state.isphotosaved ? (
                    <button
                      class="savephotos bluefont"
                      onClick={this.submitPhoto}
                    >
                      Save photos
                    </button>
                  ) : null} */}
                </div>
                {/*---------------------------------PRICING--------------------------------*/}
                <div class="tab-pane" id="pricing">
                  <div>
                    {/* <h4 class="h4v">Availability</h4> <hr class="hrlyp" /> */}
                    {/* <p class="grayie">
                      Select a starting and ending point for setting up your
                      availability
                    </p> */}
                    {/* <br /> */}
                    <div>
                      {/* <div class="form-group borderbox detailsitem2 inlinedate">
                        <label id="startdateLabel">Start Date</label>
                        <input
                          id="bathrooms"
                          value={this.state.startdate}
                          onChange={this.startdateChangeHandler}
                          type="date"
                          name="startdate"
                          ref="startdate"
                          class="detailsitemstep"
                          required
                          min={today}
                        />
                        <div className="error" id="startdateError" />
                      </div> */}
                      {/* <div class="form-group borderbox detailsitem2 inlinedate">
                        <label id="enddateLabel">End Date</label>
                        <input
                          id="bathrooms"
                          value={this.state.enddate}
                          onChange={this.enddateChangeHandler}
                          type="date"
                          name="enddate"
                          ref="enddate"
                          class="detailsitemstep"
                          // required
                          // min={this.state.startdate}
                        />
                        <div className="error" id="enddateError" />
                      </div> */}
                    </div>
                    {/* <br />
                    <br />
                    <br /> */}
                  </div>
                  <div>
                    {" "}
                    <br /> <br />{" "}
                    <h4 class="h4v">Enter Price of Your Property</h4>{" "}
                    <hr class="hrlyp" />
                    {/* <p class="grayie">
                      We recommend starting with a low price to get a few
                      bookings and earn some initial guest reviews. You can
                      update your rates at any time.
                    </p> */}
                    <div>
                      <div>
                        <br />{" "}
                        {/* <label id="nbrLabel" class="nbrLabel inlinedate">
                          {" "}
                          Nightly Base Rate{" "}
                        </label> */}
                        {/* <div class="form-group borderbox detailsitem2 inlinedate">
                          <label id="nbr2Label">$</label>
                          <input
                            id="nbr"
                            value={this.state.nbr}
                            onChange={this.nbrChangeHandler}
                            type="number"
                            name="nbr"
                            ref="nbr"
                            class="detailsitemstep"
                            min="1"
                          />
                          <div className="error" id="nbrError" />
                          <br />
                        </div> */}
                      </div>
                      <br />
                      <br />
                      <br /> {/* pricing */}
                      {/* <label id="pricingLabel" class="pricingLabel inlinedate">
                        {" "}
                        Property Price{" "}
                      </label>
                      <div class="form-group borderbox detailsitem inlinedate">
                        <label id="pricing2Label">$</label>
                        <input
                          id="pricing"
                          value={this.state.pricing}
                          onChange={this.pricingChangeHandler}
                          type="number"
                          //step="1"
                          name="pricing"
                          ref="pricing"
                          class="detailsitemstep"
                          required
                          min="1"
                        />
                        <div className="error" id="pricingError" />
                      </div> */}
                      <br />
                      <br />
                      {/* <label id="minstayLabel" class="minstayLabel inlinedate">
                        <br />
                        Minimum Stay{" "}
                      </label> */}
                      {/* <div class="form-group borderbox detailsitem3">
                        <label id="minstay2Label">$</label>
                        <input
                          id="minstay"
                          value={this.state.minstay}
                          onChange={this.minstayChangeHandler}
                          type="number"
                          step="1"
                          name="minstay"
                          ref="minstay"
                          class="detailsitemstep3"
                          min="1"
                        />
                        <div className="error" id="minstayError" />
                      </div> */}
                      <br />
                    </div>
                  </div>
                  {/* <div>
                    {" "}
                    <br /> <br /> <h4 class="h4v">Fees</h4> <hr class="hrlyp" />
                    <p class="grayie">
                      You can add fees to your listing or skip this step.
                      Additional fees can be added later.
                    </p>
                    <div>
                      <div>
                        <br />{" "}
                        <label id="cfLabel" class="cfLabel inlinedate">
                          {" "}
                          Cleaning Fee{" "}
                        </label>
                        <div class="form-group borderbox detailsitem2 inlinedate">
                          <label id="nbr2Label">$</label>
                          <input
                            id="cf"
                            value={this.state.cf}
                            onChange={this.cfChangeHandler}
                            type="number"
                            name="cf"
                            ref="cf"
                            class="detailsitemstep"
                            min="1"
                          />
                          <div className="error" id="cfError" />
                        </div>
                      </div>
                      <br />
                      <br />
                      <br />
                      <div>
                        <div align="left">
                          <span class="apayn">
                            <label class="apaLabel">
                              {" "}
                              <br />
                              Are pets allowed?{" "}
                            </label>
                            <div class="apayn2">
                              <input
                                defaultChecked="true"
                                type="radio"
                                name="apa"
                                value="no"
                                id="apano"
                              />{" "}
                              No
                              {"     "}
                              <input
                                type="radio"
                                name="apa"
                                value="yes"
                                id="apayes"
                              />{" "}
                              {"  "}
                              Yes
                            </div>
                          </span>
                          <br />
                          <br />
                        </div>
                      </div>
                      <br />
                      <br />
                      <br />
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </form>
      );
    } else redirectVar = <Redirect to="/ownerLogin" />;
    document.body.style.backgroundColor = "white";

    return (
      <div>
        {redirectVar}
        {navLogin}
      </div>
    );
  }
}
//export Login Component
//export default ListYourProperty;

export default connect(
  null,
  { lyp }
)(ListYourProperty);
