import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./Login/Login";
//import Home from "./Home/Home";
import Home from "./LandingPage/Home";
import ownerLogin from "./OwnerLogin/ownerLogin";
import SignUp from "./SignUp/SignUp";
import Profile from "./Profile/Profile";
import ListYourProperty from "./ListYourProperty/ListYourProperty";
import SearchResults from "./SearchResults/SearchResults";
import Property from "./Property/Property";
import Dashboard from "./Dashboard/Dashboard";
import Inbox from "./Messaging/inbox";

import { createStore, applyMiddleware, compose } from "redux";
import promise from "redux-promise";
import { Provider } from "react-redux";
import rootReducer from "../reducers";

//middleware settings
// To resolve promise to store we use apply
// const composePlugin = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
// const store = createStore(rootReducer, composePlugin(applyMiddleware(promise)));
import store from "../store";

//Create a Main Component
class Main extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            {/*Render Different Component based on Route*/}
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route path="/ownerlogin" component={ownerLogin} />
            <Route path="/login" component={Login} />
            <Route path="/SignUp" component={SignUp} />
            <Route path="/profile" component={Profile} />
            <Route path="/profilephoto" component={Profile} />
            <Route path="/lyp" component={ListYourProperty} />
            <Route path="/searchresults" component={SearchResults} />
            {/* <Route
              path="/home/search/:propnum_pk/:email/:where/:startdate/:enddate/:guests"
              render={props => <Property {...props} />}
            /> */}
            <Route path="/property" component={Property} />
            <Route
            path="/dashboard?=:streetaddr/:unit/:zip"
            render={props => <Dashboard {...props} />}
          />
            <Route exact path="/dashboard" component={Dashboard}/>
            <Route path="/inbox" component={Inbox} />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
//Export The Main Component
export default Main;
