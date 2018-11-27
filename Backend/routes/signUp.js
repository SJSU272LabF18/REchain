var express = require("express");
var router = express.Router();
var kafka = require("../kafka/client");

router.post("/", function(req, res) {
  console.log("Inside SignUp POST Request");
  console.log("Req Body : ", req.body);
  kafka.make_request("post_signup", req.body, function(err, result) {
    console.log("In SIGNUP result :");
    console.log(result);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      });
    } else {
      if (
        result ==
        "The email associated already has an account. Please try again!"
      )
        res.sendStatus(400).end("EXISTS");
      else {
        console.log("Created User: ", result);
        res.sendStatus(200).end();
      }
    }
  });
});
module.exports = router;
