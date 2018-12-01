import React, { Component, Fragment } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { sendmessage, ROOT_URL } from "../../actions";

import { bindActionCreators } from "redux";
const token = localStorage.getItem("token");
const today = new Date().toISOString().slice(0, 10);

//Define a Login Component
class Inbox extends Component {
  //call the constructor method
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      fname: "",
      lname: "",
      reply: "",
      result: [],
      lyp: "#",
      profileicon:
        "https://csvcus.homeaway.com/rsrcs/cdn-logos/2.10.3/bce/brand/misc/default-profile-pic.png",
      pageSize: 5,
      currentPage: 1
    };

    //Bind the handlers to this class
  }

  componentDidMount() {
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
      this.props.onGetRender();
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
    this.replyChangeHandler = this.replyChangeHandler.bind(this);
  }

  handleLogout = () => {
    localStorage.removeItem("token");
  };
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };
  replyChangeHandler = e => {
    this.setState({
      reply: e.target.value
    });
  };

  sendReply = r => {
    let to_email = r.from_email,
      to_fname = r.from_fname,
      to_lname = r.from_lname,
      from_fname = r.to_fname,
      from_lname = r.to_lname,
      reply = this.state.reply;
    if (reply == null || reply == "") {
      reply = "";
    } else {
      const data = {
        to_email: to_email,
        to_fname: to_fname,
        to_lname: to_lname,
        from_email: sessionStorage.getItem("email"),
        from_fname: from_fname,
        from_lname: from_lname,
        message: reply
      };
      this.props.sendmessage(data, () => {
        alert("Your reply has been sent!");
      });
    }
  };

  render() {
    //redirect based on successful login
    let redirectVar = null;
    let navLogin = null;

    if (localStorage.getItem("token")) {
      navLogin = (
        <div>
          <div className="header-bce bluefont">
            <div id="hal-home" className="navbar-brand bluefont-home">
              <a href="/home" className="bluefont-home">
                HomeAway
                <span className="sup">&reg;</span>
              </a>
            </div>
          </div>
          <div className="wrappernav-pro bluefont">
            <link
              href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"
              rel="stylesheet"
            />
            <link
              href="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/2.3.1/css/flag-icon.min.css"
              rel="stylesheet"
            />
            <a
              href="#"
              className="flag-icon-background flag-icon-us flag inline"
            >
              {"   "}
            </a>
            <a href="#" className="tb bluefont inline">
              Trip Boards
            </a>
            <div className="btn-group inline dropdownnav">
              <div
                className="btn-home inline bluefont"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img src={this.state.profileicon} className="smallimg" />
                {"   "}
                {this.state.fname.concat(
                  " " + this.state.lname.charAt(0) + "."
                )}{" "}
                <span className="glyphicon glyphicon-triangle-bottom smallicon" />
              </div>
              <ul className="dropdown-menu dropdown-menu-right bluefont">
                <li>
                  {" "}
                  <a className="dropdown-item bluefont" href="/inbox">
                    <p className="bluefont">
                      <span className=" glyphicon glyphicon-envelope dropdownicons bluefont" />
                      {"   "}
                      Inbox
                    </p>
                  </a>
                </li>
                <br />
                <li>
                  <a className="dropdown-item" href="/dashboard">
                    <p className="bluefont">
                      <span className="glyphicon glyphicon-briefcase dropdownicons" />{" "}
                      {"   "}
                      Dashboard
                    </p>
                  </a>
                </li>
                <br />
                <li>
                  <a className="dropdown-item" href="/profile">
                    <p className="bluefont">
                      <span className="glyphicon glyphicon-user dropdownicons" />
                      {"   "}
                      My Profile
                    </p>
                  </a>
                </li>
                <br />
                <li>
                  <a className="dropdown-item" href="#">
                    <p className="bluefont">
                      <span className="glyphicon glyphicon-cog dropdownicons" />
                      {"   "} Account
                    </p>
                  </a>
                </li>

                <li role="separator" className="divider dropdownicons" />

                <li>
                  <a
                    className="dropdown-item"
                    href="/home"
                    onClick={this.handleLogout}
                  >
                    <p className="bluefont">
                      <span className="glyphicon glyphicon-log-out dropdownicons" />{" "}
                      {"   "}
                      Logout
                    </p>
                  </a>
                </li>
              </ul>
            </div>
            <a href="/inbox" className="bluefont">
              <span
                className="glyphicon-glyphicon-envelope envelope inline bluefont"
                aria-hidden="true"
              >
                <i className="fa fa-envelope bluefont " aria-hidden="true">
                  {"  "}
                </i>
              </span>
            </a>

            <div className="btn-group userdd bluefont inline dropdownnav">
              <div
                className="btn-home inline bluefont"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Help{" "}
                <span className="glyphicon glyphicon-triangle-bottom smallicon" />
              </div>
              <ul className="dropdown-menu dropdown-menu-right bluefont">
                <li>
                  {" "}
                  <a className="dropdown-item " href="#">
                    <p className="bluefont">
                      {"   "}
                      Visit help center
                    </p>
                  </a>
                </li>
                <li role="separator" className="divider dropdownicons" />

                <li className="dropdown-header travelersfont">
                  <b>Travelers</b>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <p className="bluefont">
                      {" "}
                      {"   "}
                      How it works
                    </p>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <p className="bluefont">
                      {"   "}
                      Security Center
                    </p>
                  </a>
                </li>
                <li role="separator" className="divider dropdownicons" />

                <li className="dropdown-header travelersfont">
                  <b>Home Owners</b>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <p className="bluefont">
                      {" "}
                      {"   "}
                      How it works
                    </p>
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href={
                      sessionStorage.getItem("typeofaccount") == "owner"
                        ? "/lyp"
                        : "#"
                    }
                  >
                    <p className="bluefont">
                      {" "}
                      {"   "}
                      List your property
                    </p>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <p className="bluefont">
                      {" "}
                      {"   "}
                      Community
                    </p>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <p className="bluefont">
                      {" "}
                      {"   "}
                      Discovery Hub
                    </p>
                  </a>
                </li>
                <li role="separator" className="divider dropdownicons" />
                <li className="dropdown-header travelersfont">
                  <b>Property managers</b>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <p className="bluefont">
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
              className="buttonlyp default bluefont inline"
            >
              List your property
            </a>
            <div className="homeawayimg-pro inline">
              <img src="http://csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/birdhouse-bceheader.svg" />
            </div>
          </div>
        </div>
      );
    } else redirectVar = <Redirect to="/login" />;
    console.log("RESULTCHECK:", this.props.result);
    let messages = this.props.result
      .filter(r => r.to_email == sessionStorage.getItem("email"))
      .map((r, idx) => {
        let id_new = `${r._id}`;
        let modal_id = `myModal${r._id}`;
        let modal_id_target = "#" + modal_id;
        return (
          <div
            color="black"
            class={idx == 0 ? "tab-pane fade in active" : "tab-pane fade in"}
            id={id_new}
          >
            <p>{r.message}</p>
            <br />
            <button
              data-toggle="modal"
              data-target={modal_id_target}
              class="replybutton"
            >
              Reply
            </button>
            {/*----------------MODAL---------------------*/}

            <link
              rel="stylesheet"
              href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
            />
            <div class="modal fade" id={modal_id} role="dialog">
              <div class="modal-dialog">
                <div class="modal-content modalreply">
                  To: {r.from_fname} {r.from_lname}
                  <br />
                  <textarea
                    id="reply"
                    class="replybox"
                    placeholder="Type your message here..."
                    value={this.state.reply}
                    onChange={this.replyChangeHandler}
                  />
                  <br />
                  <button class="replybutton" onClick={() => this.sendReply(r)}>
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      });
    let sentmessages = this.props.result
      .filter(r => r.from_email == sessionStorage.getItem("email"))
      .map((r, idx) => {
        let id_new = `${r._id}`;
        return (
          <div
            color="black"
            class={idx == 0 ? "tab-pane fade in active" : "tab-pane fade in"}
            id={id_new}
          >
            <p>{r.message}</p>
          </div>
        );
      });
    let names = this.props.result
      .filter(r => r.to_email == sessionStorage.getItem("email"))
      .map((r, idx) => {
        let href_new = `#${r._id}`;
        return (
          <li class={idx == 0 ? "active" : ""}>
            <a data-toggle="pill" href={href_new}>
              {r.from_fname} {r.from_lname}
            </a>
          </li>
        );
      });
    let sentnames = this.props.result
      .filter(r => r.from_email == sessionStorage.getItem("email"))
      .map((r, idx) => {
        let href_new = `#${r._id}`;
        console.log("HREF: ", href_new);
        return (
          <li class={idx == 0 ? "active" : ""}>
            <a data-toggle="pill" href={href_new}>
              {r.to_fname} {r.to_lname}
            </a>
          </li>
        );
      });
    return (
      <div>
        {redirectVar}
        {navLogin}
        <div class="container">
          <br />
          <br />
          <ul class="nav nav-tabs">
            <li class="active">
              <a data-toggle="tab" href="#inboxtab">
                Inbox
              </a>
            </li>
            <li>
              <a data-toggle="tab" href="#senttab">
                Sent
              </a>
            </li>
          </ul>
          {/*-------------RECEIVED------------------------*/}
          <div class="tab-content">
            <div id="inboxtab" class="tab-pane fade in active">
              <h3>FROM</h3>
              <ul class="nav nav-pills nav-stacked inboxnames">{names}</ul>
              <div class="inboxmessages">
                <div class="tab-content">{messages}</div>
              </div>
            </div>

            {/*-------------SENT------------------------*/}
            <div id="senttab" class="tab-pane fade">
              <h3>TO</h3>
              <ul class="nav nav-pills nav-stacked inboxnames">{sentnames}</ul>
              <div class="inboxmessages tab-content">{sentmessages}</div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
      </div>
    );
  }
}
//export Login Component
//export default Dashboard;
const mapStateToProps = state => {
  console.log("Statetoprops: ", state.login.result);
  return {
    result: state.login.result
  };
};

const mapDispatchStateToProps = dispatch => {
  return {
    sendmessage,
    onGetRender: () => {
      axios.defaults.headers.common["Authorization"] = token;
      axios
        .get(`${ROOT_URL}/inbox`, {
          params: {
            email: sessionStorage.getItem("email")
          }
        })
        .then(response => {
          dispatch({
            type: "INBOX",
            payload: response.data,
            statusCode: response.status
          });
          //update the state with the response data
          console.log("Data response in GET: ", response.data);
        });
    }
  };
};

//export Home Component
export default connect(
  mapStateToProps,
  mapDispatchStateToProps
)(Inbox);
