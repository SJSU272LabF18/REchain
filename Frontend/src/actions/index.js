import axios from "axios";

export const LOGIN_USER = "login_user";
export const LOGIN_OWNER = "login_owner";
export const GET_USER = "get_user";
export const SIGN_UP = "sign_up";
export const LYP = "l_y_p";
export const PROFILE = "profile";
export const BOOK_PROPERTY = "book_property";
export const ASK_QUESTION = "ask_question";

const token = localStorage.getItem("token");

export const ROOT_URL = "http://localhost:3001";
export const SELF_URL = "http://localhost:3005";

//target action

export function getUser() {
  //middleware call
  //receive response from backend
  const response = axios.get(`${ROOT_URL}/home`);
  //Action dispatched
  console.log("Response", response);
  return {
    type: GET_USER,
    payload: response
  };
}

export function loginUser(values, callback) {
  const request = axios
    .post(`${ROOT_URL}/login`, values)
    .then(response => {
      console.log("Status Code : ", response.status);
      if (response.status === 200) {
        console.log("TOKENNNNN: ", response.data);
        //localStorage.setItem("token", response.data);
        callback(response.data);
      } else {
        console.log(response.status);
        alert("Username or password incorrect!");
        console.log("Username or Password incorrect");
      }
    })
    .catch(error => {
      if (error.response) {
        console.log("ERROR code: ", error.response.status);
        console.log("ERROR msg: ", error.response.data);

        alert(
          "The email or password you entered is incorrect! Please try again."
        );
      }
    });
  return {
    type: LOGIN_USER,
    payload: request
  };
}

export function loginOwner(values, callback) {
  const request = axios
    .post(`${ROOT_URL}/ownerLogin`, values)
    .then(response => {
      console.log("Status Code : ", response.status);
      if (response.status === 200) {
        callback(response.data);
      } else {
        console.log("Username or Password incorrect");
      }
    })
    .catch(error => {
      if (error.response) {
        console.log("ERROR code: ", error.response.status);
        console.log("ERROR msg: ", error.response.data);

        alert(
          "The email or password you entered is incorrect! Please try again."
        );
      }
    });

  return {
    type: LOGIN_OWNER,
    payload: request
  };
}

export function signUp(values, callback) {
  const request = axios
    .post(`${ROOT_URL}/SignUp`, values)
    .then(response => {
      console.log("Status Code : ", response.status);
      if (response.status === 200) {
        callback();
      } else if (response.status === 400) {
        console.log("Problem in signing up.");
      }
    })
    .catch(error => {
      if (error.response) {
        console.log("ERROR code: ", error.response.status);
        console.log("ERROR msg: ", error.response.data);

        alert(
          "The email ID you gave is already associated with an account. Please Log In or try signing up with another email ID."
        );
      }
    });

  return {
    type: SIGN_UP,
    payload: request
  };
}

export function lyp(values, callback) {
  axios.defaults.headers.common["Authorization"] = token;
  const request = axios.post(`${ROOT_URL}/lyp`, values).then(response => {
    console.log("Status Code : ", response.status);
    console.log("ACTION RESP: ", response.data);
    if (response.status === 200) {
      callback(response.data);
    } else {
      console.log("Problem in listing property.");
    }
  });

  return {
    type: LYP,
    payload: request
  };
}

export function buyProperty(values, callback) {
  axios.defaults.headers.common["Authorization"] = token;
  const request = axios
    .post(`${ROOT_URL}/buyproperty`, values)
    .then(response => {
      console.log("Status Code : ", response.status);
      if (response.status === 200) {
        callback();
      } else {
        console.log("Problem in buying property.");
      }
    });

  return {
    type: "BUY_PROPERTY",
    payload: request
  };
}

export function sendmessage(values, callback) {
  axios.defaults.headers.common["Authorization"] = token;
  const request = axios
    .post(`${ROOT_URL}/inbox/sendmessage`, values)
    .then(response => {
      console.log("Status Code : ", response.status);
      if (response.status === 200) {
        callback();
      } else {
        alert("Problem in posting question.");
      }
    });

  return {
    type: "ASK_QUESTION",
    payload: request
  };
}
export function checkTransactionHistory(values, callback) {
  axios.defaults.headers.common["Authorization"] = token;
  const request = axios
    .get(`${ROOT_URL}/transactionhistory`, {params: values})
    .then(response => {
      console.log("Status Code : ", response.status);
      if (response.status === 200) {
        callback(response);
      } else {
        console.log("Problem in getting transaction history");
      }
    });

  return {
    type: "BOOK_PROPERTY",
    payload: request
  };
}
export function profile(values, callback) {
  axios.defaults.headers.common["Authorization"] = token;
  const request = axios.post(`${ROOT_URL}/profile`, values).then(response => {
    console.log("Status Code : ", response.status);
    if (response.status === 200) {
      callback();
    } else {
      console.log("Problem in updating Profile Info.");
    }
  });

  return {
    type: PROFILE,
    payload: request
  };
}
