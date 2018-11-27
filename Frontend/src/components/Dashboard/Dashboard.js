import React, { Component, Fragment } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Pagination from "../Pagination/Pagination";
import paginate from "../../utils/paginate";
const token = localStorage.getItem("token");
const today = new Date().toISOString().slice(0, 10);

//Define a Login Component
class Dashboard extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      fname: "",
      lname: "",
      result: [],
      lyp: "#",
      profileicon:
        "https://csvcus.homeaway.com/rsrcs/cdn-logos/2.10.3/bce/brand/misc/default-profile-pic.png",
      pageSize: 5,
      currentPage: 1,
      fromfilter: null,
      tofilter: null,
      searchinput: null
    };

    //Bind the handlers to this class
    this.handleLocationSearch = this.handleLocationSearch.bind(this);
    this.handleToFilter = this.handleToFilter.bind(this);
    this.handleFromFilter = this.handleFromFilter.bind(this);
  }

  componentDidMount() {
    if (sessionStorage.getItem("typeofaccount") == "owner")
      this.setState({
        lyp: "/lyp"
      });
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
            profilepic: imagePreview,
            profileicon: imagePreview
          });
        });
      this.props.onGetRender();
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

  handleLogout = () => {
    localStorage.removeItem("token");
  };
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };
  handleLocationSearch = e => {
    this.setState({
      searchinput: e.target.value
    });
  };
  handleFromFilter = e => {
    this.setState({
      fromfilter: e.target.value
    });
  };
  handleToFilter = e => {
    this.setState({
      tofilter: e.target.value
    });
  };

  render() {
    //redirect based on successful login
    let redirectVar = null;
    let navLogin = null;
    let details;
    let tablesdata;
    const { pageSize, currentPage } = this.state;

    var resultnew = this.props.result;
    if (this.state.fromfilter != null) {
      resultnew = resultnew.filter(r => {
        return new Date(r.startdate) <= new Date(this.state.fromfilter);
      });
    }
    if (this.state.tofilter) {
      resultnew = resultnew.filter(r => {
        return new Date(r.enddate) >= new Date(this.state.tofilter);
      });
    }
    if (this.state.searchinput && this.props.result) {
      resultnew = resultnew.filter(r => {
        return r.headline
          .toLowerCase()
          .includes(this.state.searchinput.toLowerCase());
      });
    }

    const result = paginate(resultnew, currentPage, pageSize);
    if (sessionStorage.getItem("typeofaccount") == "owner") {
      tablesdata = result.map(booking => {
        return (
          <tr>
            <td>{booking.headline}</td>
            <td>
              {booking.city.charAt(0).toUpperCase() + booking.city.slice(1)},{" "}
              {booking.state.charAt(0).toUpperCase() + booking.state.slice(1)},{" "}
              {booking.country.charAt(0).toUpperCase() +
                booking.country.slice(1)}
            </td>
            <td>{booking.startdate}</td>
            <td>{booking.enddate}</td>
            <td>${booking.total}</td>
            <td>
              {booking.traveler_fname} {booking.traveler_lname}
            </td>
          </tr>
        );
      });
    } else if (sessionStorage.getItem("typeofaccount") == "traveler") {
      tablesdata = result.map(booking => {
        return (
          <tr>
            <td>
              {booking.city.charAt(0).toUpperCase() + booking.city.slice(1)},{" "}
              {booking.state.charAt(0).toUpperCase() + booking.state.slice(1)},{" "}
              {booking.country.charAt(0).toUpperCase() +
                booking.country.slice(1)}
            </td>
            <td>{booking.headline}</td>
            <td>{booking.startdate}</td>
            <td>{booking.enddate}</td>
            <td>${booking.total}</td>
          </tr>
        );
      });
    }
    if (sessionStorage.getItem("typeofaccount") == "owner") {
      details = (
        <div>
          <h2 class="bluefont">
            {"  "}
            Your property bookings
          </h2>
          <table class="table">
            <thead>
              <tr>
                <th>
                  <p class="tableh">Property</p>
                </th>
                <th>
                  <p class="tableh">Location</p>
                </th>
                <th>
                  <p class="tableh">From</p>
                </th>
                <th>
                  <p class="tableh">To</p>
                </th>
                <th>
                  <p class="tableh">Cost</p>
                </th>
                <th>
                  <p class="tableh">Booked by</p>
                </th>

                <th />
              </tr>
            </thead>
            <tbody>
              {/*Display the Tbale row based on data recieved*/}
              {tablesdata}
            </tbody>
          </table>
        </div>
      );
    } else if (sessionStorage.getItem("typeofaccount") == "traveler") {
      details = (
        <div>
          <h2 class="bluefont">
            {"  "}
            Your trips
          </h2>
          <br />
          <table class="table">
            <thead>
              <tr>
                <th>
                  <p class="tableh">Trip to</p>
                </th>
                <th>
                  <p class="tableh">Property</p>
                </th>
                <th>
                  <p class="tableh">From</p>
                </th>
                <th>
                  <p class="tableh">To</p>
                </th>
                <th>
                  <p class="tableh">Cost</p>
                </th>

                <th />
              </tr>
            </thead>
            <tbody>
              {/*Display the Tbale row based on data recieved*/}
              {tablesdata}
            </tbody>
          </table>
        </div>
      );
    }
    if (localStorage.getItem("token")) {
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
                  <a class="dropdown-item" href="#">
                    <p class="bluefont">
                      <span class="glyphicon glyphicon-briefcase dropdownicons" />{" "}
                      {"   "}
                      My Trips
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
        </div>
      );
    } else redirectVar = <Redirect to="/login" />;

    return (
      <div>
        {redirectVar}
        {navLogin}
        <br />
        <br />
        <label class="filterlabel">Where</label>
        <input
          type="text"
          id="myInput"
          value={this.state.searchinput}
          onChange={this.handleLocationSearch}
          class="filters"
          min="0"
          step="1"
        />
        <label class="filterlabel">From</label>
        <input
          type="date"
          id="myInput"
          onChange={this.handleFromFilter}
          class="filters"
        />
        <label class="filterlabel">To</label>
        <input
          type="date"
          id="myInput"
          onChange={this.handleToFilter}
          class="filters"
        />
        <br />
        <div>{details}</div>
        <Pagination
          itemsCount={resultnew.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}
//export Login Component
//export default Dashboard;
const mapStateToProps = state => {
  console.log("Statetoprops: ", state.login.result);
  return {
    result: state.login.result,
    fname: state.login.fname,
    lname: state.login.lname
  };
};

const mapDispatchStateToProps = dispatch => {
  return {
    onGetRender: () => {
      axios.defaults.headers.common["Authorization"] = token;
      axios
        .get("http://localhost:3001/dashboard", {
          params: {
            email: sessionStorage.getItem("email"),
            typeofaccount: sessionStorage.getItem("typeofaccount")
          }
        })
        .then(response => {
          dispatch({
            type: "DASHBOARD",
            payload: response.data,
            statusCode: response.status
          });
          //update the state with the response data
          console.log("Data  : ", response);
        });
    }
  };
};

//export Home Component
export default connect(
  mapStateToProps,
  mapDispatchStateToProps
)(Dashboard);
