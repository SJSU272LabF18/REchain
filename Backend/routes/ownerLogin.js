var express = require("express");
var router = express.Router();
var kafka = require("../kafka/client");

router.post("/", function(req, res) {
  console.log("Inside Owner Login POST Request");
  console.log("Req Body : ", req.body);
  kafka.make_request("post_ownerlogin", req.body, function(err, result) {
    console.log("In result");
    console.log(result);

    if (err) {
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
        res.send(JSON.stringify(result));
      }
    }
  });
});
module.exports = router;
