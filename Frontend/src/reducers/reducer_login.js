import _ from "lodash";
import { GET_USER } from "../actions";
import { BOOK_PROPERTY } from "../actions";

//Reducer listening to different action types
//initial state is {}
const initialstate = {
  properties: [],
  result: []
};
export default function(state = initialstate, action) {
  if (action.type == GET_USER) {
    return action.payload;
  }

  if (action.type == "HOME") {
    console.log("Data recieved in reducer_login: ", action.payload.fname);
    console.log("STATE: ", ...state);
    return {
      ...state,
      fname: action.payload.fname,
      lname: action.payload.lname,
      abt: action.payload.abt,
      city_cntry: action.payload.city_cntry,
      company: action.payload.company,
      school: action.payload.school,
      hometown: action.payload.hometown,
      languages: action.payload.languages,
      gender: action.payload.gender,
      phone: action.payload.phone,
      photoname: action.payload.photoname
    };
  }
  if (action.type == "SEARCH") {
    console.log("Data recieved in reducer_login: ", action.payload);
    return {
      ...state,
      properties: action.payload
    };
  }
  if (action.type == "DASHBOARD") {
    console.log("Data recieved in reducer_login: ", action.payload);
    return {
      ...state,
      result: action.payload
    };
  }
  if (action.type == "INBOX") {
    console.log("Data recieved in reducer_login: ", action.payload);
    return {
      ...state,
      result: action.payload
    };
  }
  if (action.type == "BOOK_PROPERTY") {
    console.log("Data recieved in reducer_login: ", action.payload);
    return {
      ...state
    };
  }
  return state;
}
