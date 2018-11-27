var express = require("express");
var router = express.Router();
var kafka = require("../kafka/client");

router.post("/", function(req, res) {
  kafka.make_request("post_login", req.body, function(err, result) {
    console.log("In result of LOGIN");
    console.log(result);
    if (err) {
      // res.sendStatus(400).end();
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      });
    } else {
      if (
        result == "User doesn't exist!!" ||
        result == "Password is incorrect!!"
      ) {
        res.sendStatus(400).end("UNAME PASS ERROR");
      } else {
        console.log("Inside else: ", JSON.stringify(result));
        res.status(200).send(JSON.stringify(result));
      }
    }
  });
});

module.exports = router;
