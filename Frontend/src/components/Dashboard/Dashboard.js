import React, { Component, Fragment } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Pagination from "../Pagination/Pagination";
import paginate from "../../utils/paginate";
import { ROOT_URL } from "../../actions";
import { checkTransactionHistory } from "../../actions";
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
      searchinput: null,
      streetaddr:"",
      unit:"",
      zip:""
    
    };
    //Bind the handlers to this class
    this.handleLocationSearch = this.handleLocationSearch.bind(this);
    this.handleToFilter = this.handleToFilter.bind(this);
    this.handleFromFilter = this.handleFromFilter.bind(this);
    this.handleZipChange = this.handleZipChange.bind(this); //zip
    this.handleUnitChange = this.handleUnitChange.bind(this); //zip
    this.handleStreetaddrChange = this.handleStreetaddrChange.bind(this); //zip

  }

  componentDidMount() {
    document.title = "Bloquity";
    if (sessionStorage.getItem("typeofaccount") == "owner")
      this.setState({
        lyp: "/lyp"
      });
    if (localStorage.getItem("token")) {
      axios.defaults.headers.common["Authorization"] = token;
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
            profilepic: imagePreview,
            profileicon: imagePreview
          });
        });
      if(this.props.location.state){
        this.state.streetaddr=this.props.location.state.streetaddr
        this.state.unit=this.props.location.state.unit
        this.state.zip=this.props.location.state.zip
        this.props.getTransactionHistory({streetaddr: this.props.location.state.streetaddr,
          unit: this.props.location.state.unit,
          zip: this.props.location.state.zip});
      }

      if(typeof(this.props.match.params.streetaddr)!="undefined") {
        this.state.streetaddr=this.props.match.params.streetaddr
        this.state.unit=this.props.match.params.unit
        this.state.zip=this.props.match.params.zip
        this.props.getTransactionHistory({streetaddr: this.props.match.params.streetaddr,
          unit: this.props.match.params.unit,
          zip: this.props.match.params.zip});
      }


    }
    if (localStorage.getItem("token")) {
      axios.defaults.headers.common["Authorization"] = token;
      axios
        .get(`${ROOT_URL}/home`, {
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

  handleZipChange = e => {
    this.setState({
      zip: e.target.value
    });
  };
  handleStreetaddrChange = e => {
    this.setState({
      streetaddr: e.target.value
    });
  };
   handleUnitChange = e => {
    this.setState({
      unit: e.target.value
    });
  };

handleDashSearch=()=>{
  this.props.getTransactionHistory({streetaddr: this.state.streetaddr,
    unit: this.state.unit,
    zip: this.state.zip})
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
      if (this.props.result.hasOwnProperty('error') && this.props.result.error == 404) {
        tablesdata = (
          <tr>
          <td>Property does not exist</td>
          <td>NA</td>
          <td>NA</td>
          <td>NA</td>
        </tr>
        );
      } else  {
        tablesdata = this.props.result.map(booking => {
          return (
            <tr>
              <td>{booking.buyer}</td>
              <td>{booking.seller}</td>
              <td>{booking.trans_date}</td>
              <td>${booking.trans_amt}</td>
            </tr>
          );
        });
      }
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
        <div class="tablecss">
          <h2 class="bluefont h2th">
            <center>
            Transaction History
            <br></br>
            <br></br>
            </center>
          </h2>
          <table class="table tableborder" >
            <thead>
              <tr>
                <th>
                  <p class="tableh">Buyer</p>
                </th>
                <th>
                  <p class="tableh">Seller</p>
                </th>
                <th>
                  <p class="tableh">Transaction Date</p>
                </th>
                <th class="">
                  <p class="tableh ta">Transaction Amount</p>
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
          <div class="wrappernav-home-nli">
            <link
              href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"
              rel="stylesheet"
            />
            {/* <link
              href="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/2.3.1/css/flag-icon.min.css"
              rel="stylesheet"
            />
            {/* <a href="#" class="flag-icon-background flag-icon-us flag inline"> */}
              {"   "}
            {/* </a> */}
            {/* <a href="#" class="tb bluefont inline">
              Trip Boards
            </a>  */}

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

            <div class="btn-group inline dropdownnav">
              <div
                class="btn-home inline bluefont-home"
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
                {/* <li>
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
                </li> */}
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
            {/* <a href="/inbox" class="bluefont">
              <span
                class="glyphicon-glyphicon-envelope envelope inline bluefont"
                aria-hidden="true"
              >
                <i class="fa fa-envelope bluefont " aria-hidden="true">
                  {"  "}
                </i>
              </span>
            </a> */}

            <div class="btn-group userdd bluefont inline dropdownnav">
              {/* <div
                class="btn-home inline bluefont-home"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Help{" "}
                <span class="glyphicon glyphicon-triangle-bottom smallicon" />
              </div> */}
              <ul class="dropdown-menu dropdown-menu-right bluefont">
                <li>
                  {" "}
                  {/* <a class="dropdown-item " href="#">
                    <p class="bluefont">
                      {"   "}
                      Visit help center
                    </p>
                  </a> */}
                </li>
                <li role="separator" class="divider dropdownicons" />

                {/* // <li class="dropdown-header travelersfont">
                //   <b>Travelers</b>
                // </li> */}
                <li>
                  <a class="dropdown-item" href="#">
                    {/* <p class="bluefont">
                      {" "}
                      {"   "}
                      How it works
                    </p> */}
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    {/* <p class="bluefont">
                      {"   "}
                      Security Center
                    </p> */}
                  </a>
                </li>
                <li role="separator" class="divider dropdownicons" />

                {/* <li class="dropdown-header travelersfont">
                  <b>Home Owners</b>
                </li> */}
                <li>
                  <a class="dropdown-item" href="#">
                    {/* <p class="bluefont">
                      {" "}
                      {"   "}
                      How it works
                    </p> */}
                  </a>
                </li>
                <li>
                  {/* <a
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
                  </a> */}
                </li>
                <li>
                  {/* <a class="dropdown-item" href="#">
                    <p class="bluefont">
                      {" "}
                      {"   "}
                      Community
                    </p>
                  </a> */}
                </li>
                <li>
                  {/* <a class="dropdown-item" href="#">
                    <p class="bluefont">
                      {" "}
                      {"   "}
                      Discovery Hub
                    </p>
                  </a> */}
                </li>
                <li role="separator" class="divider dropdownicons" />
                {/* <li class="dropdown-header travelersfont">
                  <b>Property managers</b>
                </li> */}
                <li>
                  {/* <a class="dropdown-item" href="#">
                    <p class="bluefont">
                      {" "}
                      {"   "}
                      List your properties
                    </p>
                  </a> */}
                </li>
              </ul>
            </div>
           
            <div class="homeawayimg-pro inline">
              <img src="https://i.imgur.com/fLTMlTI.png" />
            </div>
          </div>
        </div>
      );
 

    return (
      <div>
        {redirectVar}
        {navLogin}
        <br />
        <br />
        <br />
        <div>

        <div class="flex-filter">
        <br />
        
        <label class="filterresultslabel_New2">Enter Full Address</label>
        <br />
        

        <div class="flex-container_New3">

                
                <div class="inner-addon left-addon">
                  <i class="glyphicon  gapsfi glyphicon-map-marker" />
                  <input
                    type="search"
                    class="searchfields mediumsearch"
                    placeholder="Street Address"
                    value={this.state.streetaddr}
                    onChange={this.handleStreetaddrChange}
                  />
                </div>
                <div class="inner-addon left-addon">
                  <i class="glyphicon gapsfi glyphicon-map-marker" />
                  <input
                    type="search"
                    class="searchfields mediumsearch"
                    placeholder="Unit"
                    value={this.state.unit}
                    onChange={this.handleUnitChange}
                  />
                </div>
                <div class="inner-addon left-addon">
                  <i class="glyphicon gapsfi glyphicon-map-marker" />
                  <input
                    type="search"
                    class="searchfields mediumsearch"
                    placeholder="Zip Code"
                    value={this.state.zip}
                    onChange={this.handleZipChange}
                  />
                </div>
                <button class="homesearchbuttondash" onClick={this.handleDashSearch}>
                Search</button>
                </div>
                </div>
          </div>
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
    //access this as this.props.result
    result: state.login.result
  };
};

const mapDispatchStateToProps = dispatch => {
  return {
    getTransactionHistory: (values) => {

      axios.defaults.headers.common["Authorization"] = token;
      const request = axios
        .get(`${ROOT_URL}/transactionhistory`, {params: values})
        . then(response => {
              dispatch({
                type: "BOOK_PROPERTY",
                payload: response.data,
                statusCode: response.status
              });
              //update the state with the response data
              console.log("Data  : ", response);
            });
    
    
      // axios.defaults.headers.common["Authorization"] = token;
      // axios
      //   .get(`${ROOT_URL}/dashboard`, {
      //     params: {
      //       email: sessionStorage.getItem("email"),
      //       typeofaccount: sessionStorage.getItem("typeofaccount")
      //     }
      //   })
      //   .then(response => {
      //     dispatch({
      //       type: "DASHBOARD",
      //       payload: response.data,
      //       statusCode: response.status
      //     });
      //     //update the state with the response data
      //     console.log("Data  : ", response);
      //   });
    }
  };
};

//export Home Component
export default connect(
  mapStateToProps,
  mapDispatchStateToProps
)(Dashboard);
