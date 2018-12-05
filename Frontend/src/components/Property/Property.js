import React, { Component, Fragment } from "react";
import "../../App.css";
import axios from "axios";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { buyProperty } from "../../actions";
import { checkTransactionHistory } from "../../actions";
import { sendmessage, ROOT_URL } from "../../actions";
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
      price,
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
      price: price,
      owner_fname: owner_fname,
      owner_lname: owner_lname,
      //total: total,
      profileicon:
        "https://csvcus.homeaway.com/rsrcs/cdn-logos/2.10.3/bce/brand/misc/default-profile-pic.png"
    };

    //Bind the handlers to this class
    this.buyProperty = this.buyProperty.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.transactionHistory = this.transactionHistory.bind(this);
  }

  componentDidMount() {
    document.title = "Bloquity";
    if(1) {
     // axios.defaults.headers.common["Authorization"] = token;
      axios
        .get(`${ROOT_URL}/photos/profile`, {
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

   //   axios.defaults.headers.common["Authorization"] = token;
      axios
        .get(`${ROOT_URL}/photos/property`, {
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
  }

  handleLogout = () => {
    localStorage.removeItem("token");
  };
  transactionHistory = e => {
    var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();
    // var email = sessionStorage.getItem('email');
    // const data = {
    //   streetaddr: this.state.streetaddr,
    //   unit: this.state.unit,
    //   zip: this.state.zip
    // };

    // this.props.history.push("/dashboard");
    // this.props.history.push ({
    //   pathname: '/dashboard',
    //   state: { tranhist: "HELLO" }
    // })
  };

  buyProperty = e => {
    if(token) {
      var headers = new Headers();
      //prevent page from refresh
      e.preventDefault();
      // var email = sessionStorage.getItem('email');
      const data = {
        trans_amt: this.state.price,
        fname: this.state.fname,
        lname: this.state.lname,
        owner_fname: this.state.owner_fname,
        owner_lname: this.state.owner_lname,
        streetaddr: this.state.streetaddr,
        unit: this.state.unit,
        zip: this.state.zip,
        property_id: this.state.propnum_pk
      };
      
      if(data.fname!=data.owner_fname || data.lname!=data.owner_lname) {
        this.props.buyProperty(data, () => {
          alert("Congratulations. Property Brought! Check Property history");
          var address=String(this.state.streetaddr).replace(/\s+/g, "")
          this.props.history.push({
            pathname: `/dashboard?=${address}/${this.state.unit}/${this.state.zip}`,
            // state: { streetaddr: this.state.streetaddr,unit:this.state.unit,zip:this.state.zip }
          });
        });
      } else {
        alert("You already own the property")
      }
    } else {
      alert("Please log in to buy the property.")
    }
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
if(this.state.fname&&this.state.lname)
var details=  (            <div class="btn-group inline dropdownnav">
<div
  class="btn-home inline bluefont-home"
  data-toggle="dropdown"
  aria-haspopup="true"
  aria-expanded="false"
>
  <img src={this.state.profileicon} class="smallimg" />
  {"   "}
{this.state.fname.concat(" " + this.state.lname)}
  <span class="glyphicon glyphicon-triangle-bottom smallicon" />
</div>
<ul class="dropdown-menu dropdown-menu-right bluefont">
  {/* <li>
    {" "}
    <a class="dropdown-item bluefont" href="/inbox">
      <p class="bluefont">
        <span class=" glyphicon glyphicon-envelope dropdownicons bluefont" />
        {"   "}
        Inbox
      </p>
    </a>
  </li> */}
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
</div>)
else 
var details=( <div class="btn-group inline dropdownnav">
<div
  class=" btn-home inline bluefont-home"
  data-toggle="dropdown"
  aria-haspopup="true"
  aria-expanded="false"
>
  {" "}
  Login{" "}
  <span class="glyphicon glyphicon-triangle-bottom smallicon" />
</div>
<ul class="dropdown-menu dropdown-menu-right bluefont">
  <li>
    {" "}
    <a class="dropdown-item " href="/login">
      <p class="bluefont">Login</p>
    </a>
  </li>
  <li>
    <a class="dropdown-item" href="/SignUp">
      <p class="bluefont">Sign Up</p>
    </a>
  </li>
</ul>
</div>);
    if (1) {
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
          <div class="wrappernavdetails ">
            {/* <link
              href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"
              rel="stylesheet"
            />
            <link
              href="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/2.3.1/css/flag-icon.min.css"
              rel="stylesheet" */}

            {/* <a href="#" class="flag-icon-background flag-icon-us flag inline">
              {"   "}
            </a> */}
            {/* <a href="#" class="tb bluefont inline">
              Trip Boards
            </a> */}
            <a href="#" class="flag-icon-background flag-icon-us flag inline">
              {"   "}
            </a>
            <a href="/dashboard" class="buttonlyp default bluefont inline">
              Property History
            </a>
            <button class="buttonlyp default bluefont inline">About Us</button>
            <button class="buttonlyp default bluefont inline">Contact</button>
            <a
              href={
                sessionStorage.getItem("typeofaccount") == "owner"
                  ? "/lyp"
                  : "#"
              }
              class="buttonlyp default bluefont inline"
            >
              Post your property
            </a>
            {
      details
        }{" "}

            {/* <a
              href={
                sessionStorage.getItem("typeofaccount") == "owner"
                  ? "/lyp"
                  : "#"
              }
              class="buttonlyp default bluefont inline"
            >
              List your property
            </a> */}
            <div class="homeawayimg-home inline">
              <img src="https://i.imgur.com/fLTMlTI.png" />
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
          <div class="tablecss2">
            <p class="grayie_Description">
              <b> Property Description:</b> {this.state.propdesc}{" "}
            </p>
          </div>
          <div class="tablecss3">
            <div class="coninfo">
              {/* <div class="propinfo_New descNew">
                <h2>{this.state.headline}</h2>
              </div> */}
              {/* <p class="grayie_Details">
              Details </p> */}{" "}
              <h3 class="bluefont2 h2th3">
                <center> {"     "} Details</center>
                <p class="vl" />
                <br />
              </h3>
              <div class="iconsprop">
                <p class="grayie">
                  <b>Property Manager: </b> {this.state.owner_fname}{" "}
                  {this.state.owner_lname}
                </p>

                <p class="grayie">
                  <b>Address of Property:</b> {"  "}
                  {this.state.streetaddr} {", "}{" "}
                  {this.state.unit} {", "} {" "}
                  {this.state.city.charAt(0).toUpperCase() +
                    this.state.city.slice(1)}{" "}
                  {", "} {this.state.state.toUpperCase()} {", "}{" "}
                  {this.state.zip}
                </p>

                <p class="grayie">
                  {" "}
                  <b>Price of Property: </b>
                  {"$"}
                  {this.state.price}
                </p>
                <p class="grayie">
                  {" "}
                  <b>Property Size: </b>
                  {this.state.sqft} {"Square Feet"}
                </p>

                <p class="grayie">
                  <b>Property Type: </b>{" "}
                  {this.state.proptype.charAt(0).toUpperCase() +
                    this.state.proptype.slice(1)}
                </p>

                <i class=" picon glyphicon glyphicon-bed">
                  {" "}
                  <br />
                  <span class="iconnames">Bedrooms: {this.state.rooms}</span>
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
                  <span class="iconnames">
                    Bathrooms: {this.state.bathrooms}
                  </span>
                </i>
              </div>
              <br />
              <br />
              <br />
              <div>
                <button id="linktranhist2" onClick={this.buyProperty}>
                  Buy Property
                </button>

                <Link
                  id="linktranhist"
                  to={{
                    pathname: "/dashboard",
                    state: {
                      streetaddr: this.state.streetaddr,
                      unit: this.state.unit,
                      zip: this.state.zip
                    }
                  }}
                >
                  View Transaction History
                </Link>
              </div>
            </div>
          </div>{" "}
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
  { buyProperty, sendmessage, checkTransactionHistory }
)(Property);
