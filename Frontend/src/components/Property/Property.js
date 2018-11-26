import React, { Component, Fragment } from "react";
import "../../App.css";
import axios from "axios";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bookproperty } from "../../actions";
import { sendmessage } from "../../actions";
//today
const today = new Date().toISOString().slice(0, 10);
const token = localStorage.getItem("token");
//Define a Login Component
class Property extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    const {
      where,
      startdate,
      enddate,
      guests,
      propnum_pk,
      email,
      fname,
      lname,
      proptype,
      streetaddr,
      country,
      unit,
      city,
      state,
      zip,
      headline,
      propdesc,
      sqft,
      yearbuilt,
      parking,
      rooms,
      bathrooms,
      accomodates,
      nbr,
      minstay,
      cf,
      owner_fname,
      owner_lname
    } = this.props.location.state;

    // let rate = Number(nbr);
    // let date1 = new Date(startdate);
    // let date2 = new Date(enddate);
    // let res = Math.abs(date1 - date2) / 1000;
    // let nights = Math.floor(res / 86400);
    // let fee = parseInt(cf, 10);
    // let total = nights * rate + fee;

    //maintain the state required for this component
    this.state = {
      where: where,
      // startdate_me: startdate.slice(0, 10),
      // enddate_me: enddate.slice(0, 10),
      guests: guests,
      propnum_pk: propnum_pk,
      prop_owner_email: email,
      fname: fname,
      lname: lname,
      proptype: proptype,
      country: country,
      streetaddr: streetaddr,
      lyp: "#",
      unit: unit,
      city: city,
      state: state,
      zip: zip,
      headline: headline,
      propdesc: propdesc,
      sqft,
      yearbuilt,
      parking,
      rooms: rooms,
      bathrooms: bathrooms,
      accomodates: accomodates,
      nbr: nbr,
      minstay: minstay,
      cf: cf,
      photos: [],
      pic1: "",
      pic2: "",
      pic3: "",
      pic4: "",
      pic5: "",
      owner_fname: owner_fname,
      owner_lname: owner_lname,
      //total: total,
      profileicon:
        "https://csvcus.homeaway.com/rsrcs/cdn-logos/2.10.3/bce/brand/misc/default-profile-pic.png"
    };

    //Bind the handlers to this class
    this.bookNow = this.bookNow.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
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
        let imagePreview = "data:image/jpg;base64, " + response.data;
        this.setState({
          profileicon: imagePreview
        });
        // console.log("PROFILEICON", this.state.profileicon);
      });

    axios.defaults.headers.common["Authorization"] = token;
    axios
      .get("http://localhost:3001/photos/property", {
        params: {
          owner_email: this.state.prop_owner_email,
          propnum_pk: this.state.propnum_pk
        }
      })
      .then(response => {
        //update the state with the response data
        //console.log("Image Res : ", response.data[0]);
        response.data.forEach(element => {
          //  console.log("ElEM", element);
          let imagePreview = "data:image/jpg;base64, " + element;
          this.setState(
            {
              photos: this.state.photos.concat(imagePreview)
            },
            //callback()
            () => {
              if (this.state.photos.length == 2) {
                this.setState({
                  pic3: this.state.photos[0],
                  pic1: this.state.photos[0],
                  pic5: this.state.photos[0],
                  pic2: this.state.photos[1],
                  pic4: this.state.photos[1]
                });
              } else if (this.state.photos.length == 3) {
                this.setState({
                  pic1: this.state.photos[0],
                  pic4: this.state.photos[0],
                  pic2: this.state.photos[1],
                  pic5: this.state.photos[1],
                  pic3: this.state.photos[2]
                });
              } else if (this.state.photos.length == 4) {
                this.setState({
                  pic1: this.state.photos[0],
                  pic5: this.state.photos[0],
                  pic2: this.state.photos[1],
                  pic3: this.state.photos[2],
                  pic4: this.state.photos[3]
                });
              } else if (this.state.photos.length == 5) {
                this.setState({
                  pic1: this.state.photos[0],
                  pic2: this.state.photos[1],
                  pic3: this.state.photos[2],
                  pic4: this.state.photos[3],
                  pic5: this.state.photos[4]
                });
              }
            }
          );
        });
      });
  }

  handleLogout = () => {
    localStorage.removeItem("token");
  };

  bookNow = e => {
    var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();
    // var email = sessionStorage.getItem('email');
    const data = {
      email: sessionStorage.getItem("email"),
      owner_email: this.state.prop_owner_email,
      propnum_pk: this.state.propnum_pk,
      startdate: this.state.startdate_me,
      enddate: this.state.enddate_me,
      guests: this.state.guests,
      total: this.state.total,
      city: this.state.city,
      state: this.state.state,
      country: this.state.country,
      headline: this.state.headline,
      fname: this.state.fname,
      lname: this.state.lname
    };
    this.props.bookproperty(data, () => {
      alert("Your booking has been made!");
      this.props.history.push("/dashboard");
    });
  };

  sendMessage = () => {
    var question = prompt(
      `Please enter your question for ${this.state.owner_fname} ${
        this.state.owner_lname
      }`,
      ""
    );
    if (question == null || question == "") {
      question = "";
    } else {
      const data = {
        to_email: this.state.prop_owner_email,
        to_fname: this.state.owner_fname,
        to_lname: this.state.owner_lname,
        from_email: sessionStorage.getItem("email"),
        from_fname: this.state.fname,
        from_lname: this.state.lname,
        message: question
      };
      this.props.sendmessage(data, () => {
        alert("Your question has been sent!");
      });
    }
  };

  render() {
    //redirect based on successful login
    let redirectVar = null;
    let navLogin = null;
    let photos = null;

    if (token) {
      navLogin = (
        <div>
          <div class="header-bce-home_New bluefont-home">
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
            <link
              href="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/2.3.1/css/flag-icon.min.css"
              rel="stylesheet"
            />
            {/* <a href="#" class="flag-icon-background flag-icon-us flag inline">
              {"   "}
            </a> */}
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
          {/*-----------------------------------------PHOTO -------------------------------------*/}
          <div
            id="myCarousel"
            class="carousel slide carouselprop"
            data-ride="carousel"
          >
            <ol class="carousel-indicators">
              <li data-target="#myCarousel" data-slide-to="1" />
              <li data-target="#myCarousel" data-slide-to="2" />
              <li data-target="#myCarousel" data-slide-to="3" />
              <li data-target="#myCarousel" data-slide-to="4" />
              <li data-target="#myCarousel" data-slide-to="5" />
            </ol>

            <div class="carousel-inner">
              <div class="item active">
                <img src={this.state.pic1} alt="Pic1" class="propimage" />
              </div>

              <div class="item">
                <img src={this.state.pic2} alt="Pic2" class="propimage" />
              </div>

              <div class="item">
                <img src={this.state.pic3} alt="Pic3" class="propimage" />
              </div>

              <div class="item">
                <img src={this.state.pic4} alt="Pic4" class="propimage" />
              </div>

              <div class="item">
                <img src={this.state.pic5} alt="Pic5" class="propimage" />
              </div>
            </div>

            <a
              class="left carousel-control "
              id="leftcar"
              href="#myCarousel"
              data-slide="prev"
            >
              <span class="glyphicon glyphicon-chevron-left" />
              <span class="sr-only">Previous</span>
            </a>
            <a
              class="right carousel-control"
              id="rightcar"
              href="#myCarousel"
              data-slide="next"
            >
              <span class="glyphicon glyphicon-chevron-right" />
              <span class="sr-only">Next</span>
            </a>
          </div>

          {/*-----------------------------------------PHOTO -------------------------------------*/}

          <br />
          <p class="grayie">Description of Property: </p>
          <p class="propdescclass">{this.state.propdesc}</p>

          <div class="propinfo desc">
            <h2>{this.state.headline}</h2>{" "}
            {/* <p class="grayie">
              <span>
                {" "}
                <i class="glyphicon glyphicon-map-marker" />{" "}
                {this.state.city.charAt(0).toUpperCase() +
                  this.state.city.slice(1)}
                ,{" "}
                {this.state.state.charAt(0).toUpperCase() +
                  this.state.state.slice(1)}
                ,{" "}
                {this.state.country.charAt(0).toUpperCase() +
                  this.state.country.slice(1)}
              </span>
            </p> */}
            <br />
            <br />
            {/* <div class="iconsprop">
              <i class="picon glyphicon glyphicon-home">
                <br />
                <span class="iconnames">
                  {" "}
                  {this.state.proptype.charAt(0).toUpperCase() +
                    this.state.proptype.slice(1)}
                </span>
              </i>
              <i class=" picon glyphicon glyphicon-bed">
                {" "}
                <br />
                <span class="iconnames">Rooms: {this.state.rooms}</span>
              </i>
              <i class=" picon glyphicon glyphicon-user">
                <br />
                <span class="iconnames">Sleeps: {this.state.accomodates}</span>
              </i>
              <link
                rel="stylesheet"
                href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
                integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU"
                crossorigin="anonymous"
              />
              <i class=" picon fas fa-bath">
                {" "}
                <br />
                <span class="iconnames">Baths: {this.state.bathrooms}</span>
              </i>
              <i class="picon far fa-moon">
                {" "}
                <br />
                <span class="iconnames">
                  Minimum Stay: {this.state.minstay}
                </span>
              </i>
            </div> */}
            <br />
            <br />
            <hr />
            <br />
            {/* <p class="grayie">About the Property</p>
            <p class="propdescclass">{this.state.propdesc}</p> */}
            <br />
            <br />
            <br />
            {/* <p class="grayie">Property Size</p>
            <p class="sqftclass">{this.state.sqft}</p> */}
            <br />
            <br />
            <br />
            {/* <b>Property Manager</b>
            <br />
            <p class="grayie">
              {this.state.owner_fname} {this.state.owner_lname}
            </p> */}
            <br />
            <br />
            <hr />
          </div>
          <div class="detailscontainer">
            <div class="coninfo">
              <p class="grayie">Details </p>

              <div class="iconsprop">
                <p class="grayie">Address of Property</p>
                <p class="sqftclass">{this.state.sqft}</p>
                <br />
                <p class="grayie">Property Size</p>
                <p class="sqftclass">{this.state.sqft}</p>
                <i class="picon glyphicon glyphicon-home">
                  <br />
                  <span class="iconnames">
                    {" "}
                    {this.state.proptype.charAt(0).toUpperCase() +
                      this.state.proptype.slice(1)}
                  </span>
                </i>
                <i class=" picon glyphicon glyphicon-bed">
                  {" "}
                  <br />
                  <span class="iconnames">Rooms: {this.state.rooms}</span>
                </i>
                {/* <i class=" picon glyphicon glyphicon-user">
                  <br />
                  <span class="iconnames">
                    Sleeps: {this.state.accomodates}
                  </span>
                </i> */}
                <link
                  rel="stylesheet"
                  href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
                  integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU"
                  crossorigin="anonymous"
                />
                <i class=" picon fas fa-bath">
                  {" "}
                  <br />
                  <span class="iconnames">Baths: {this.state.bathrooms}</span>
                </i>
                {/* <i class="picon far fa-moon">
                  {" "}
                  <br />
                  <span class="iconnames">
                    Minimum Stay: {this.state.minstay}
                  </span>
                </i> */}
              </div>
              {/* <h2>
                ${this.state.nbr}
                <span class="grayie small"> per night</span>
              </h2> */}
              <br />
              <br />
              {/* <p>
                <span class="grayie">
                  <i class="fas fa-check-circle green" />
                  {"  "}
                  Your dates are{" "}
                </span>
                <b>Available!</b>
              </p> */}
              {/* <table>
                <tr>
                  <td class="borderbox spaces">
                    <span class="grayie"> Check in:</span>
                    <br />
                    {this.state.startdate_me}
                  </td>
                  <td class="borderbox spaces">
                    <span class="grayie"> Check out:</span>
                    <br />
                    {this.state.enddate_me}
                  </td>
                </tr>
                <tr>
                  {" "}
                  <td colspan="2" class="borderbox spaces">
                    <span class="grayie"> Guests:</span>
                    <br />
                    {this.state.guests} guest
                  </td>
                </tr>
              </table> */}
              {/* <br />
              <p class="grayie">Total: ${this.state.total}</p>
              <p class="grayie small">Includes taxes and fees.</p>
              <br /> */}
              <button class="homesearchbutton book" onClick={this.bookNow}>
                Buy
              </button>
              <br />
              <br />
              {/* <button onClick={this.sendMessage} class="messagebutton ">
                Ask Owner a question
              </button> */}
              <button class="homesearchbutton book" onClick={this.bookNow}>
                View Transaction History
              </button>
              <br />
              {/* <div class="small discpay">
                <span class="grayie">For booking assistance, call</span>{" "}
                <b>888-829-7076</b>
                <br />
                <b>Property #</b> <span class="grayie">4578714</span>{" "}
                <b>Unit#</b>
                <span class="grayie">5204351</span>
              </div> */}
              <br />
              <br />
              <b>Property Manager</b>
              <br />
              <p class="grayie">
                {this.state.owner_fname} {this.state.owner_lname}
              </p>
            </div>
          </div>
        </div>
      );
    } else redirectVar = <Redirect to="/login" />;
    document.body.style.backgroundColor = "white";

    return (
      <div>
        {redirectVar}
        {navLogin}

        <br />
        <br />
      </div>
    );
  }
}
//export Login Component
//export default Property;

export default connect(
  null,
  { bookproperty, sendmessage }
)(Property);
