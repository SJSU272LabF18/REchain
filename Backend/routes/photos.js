require("../config/passport");

require("../../Backend/db/mongoose");
const passport = require("passport");
var express = require("express");
var router = express.Router();
var kafka = require("../kafka/client");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const uuidv4 = require("uuid/v4");
var Users = require("../models/user");
var Properties = require("../models/property");
var requireAuth = passport.authenticate("jwt", { session: false });

router.get("/property", function(req, res) {
  console.log("Inside Property photo GET request");
  Properties.find(
    {
      _id: req.query.propnum_pk
    },
    { photos: 1 }
  ).then(
    docs => {
      console.log("Documents fetched from MongoDB: ");
      console.log(docs[0].photos);
      var pics = docs[0].photos;
      var base64imgArr = [];
      pics.map(pic => {
        var fileLocation = path.join(__dirname, "..", "/propertyimages", pic);
        var img = fs.readFileSync(fileLocation);
        base64img = new Buffer(img).toString("base64");
        base64imgArr.push(base64img);
      });
      res.writeHead(200, {
        "Content-Type": "image/jpg"
      });
      res.end(JSON.stringify(base64imgArr));
    },
    err => {
      res.code = "400";
      res.value =
        "The email and password you entered did not match our records. Please double-check and try again.";
      console.log(res.value);
      res.sendStatus(400).end();
      console.log("Unable to fetch documents: ", err);
    }
  );
});

router.get("/profile", function(req, res) {
  console.log("Inside Profilezzzz photo GET request");
  console.log("req body: ", req.query);
  Users.findOne(
    {
      email: req.query.email
    },
    { photoname: 1 }
  ).then(
    docs => {
      console.log("Documents fetched from MongoDB: ");
      console.log(JSON.stringify(docs, undefined, 2));
      console.log(docs.photoname);
      var file = docs.photoname;
      if (file != null && file != "") {
        console.log("File-name: ", file);
        var fileLocation = path.join(__dirname, "..", "/images", file);
        console.log("File path: ", fileLocation);
        var img = fs.readFileSync(fileLocation);
        var base64img = new Buffer(img).toString("base64");
        res.writeHead(200, { "Content-Type": "image/jpg" });
        res.end(base64img);
      }
    },
    err => {
      res.code = "400";
      res.value =
        "The email and password you entered did not match our records. Please double-check and try again.";
      console.log(res.value);
      res.sendStatus(400).end();
      console.log("Unable to fetch documents: ", err);
    }
  );
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    /*
        Files will be saved in the 'images' directory. This directory should already exist.
      */
    cb(null, path.join(__dirname, "..", "/images"));
  },
  filename: (req, file, cb) => {
    /*
        uuidv4() will generate a random ID that we'll use for the
        new filename. We use path.extname() to get
        the extension from the original file name and add that to the new
        generated ID. These combined will create the file name used
        to save the file on the server and will be available as
        req.file.pathname in the router handler.
      */
    const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, newFilename);
  }
});
// create the multer instance that will be used to upload/save the file
const upload = multer({ storage });
router.post("/profile", upload.single("files"), (req, res) => {
  console.log("INSIDE PROFILE PHOTO POST");
  /*
      We now have a new req.file object here. At this point the file has been saved
      and the req.file.filename value will be the name returned by the
      filename() function defined in the diskStorage configuration. Other form fields
      are available here in req.body.
    */

  console.log("Connection Successful");
  //business logic goes here
  Users.findOneAndUpdate(
    {
      email: req.body.email
    },
    {
      $set: {
        photoname: req.file.filename
      }
    },
    { returnOriginal: false }
  ).then(
    user => {
      console.log("Profile photo updated", user);
      res.sendStatus(200).end();
    },
    err => {
      console.log("Unable to update photo");
      res.sendStatus(400).end();
    }
  );
});

const storage2 = multer.diskStorage({
  destination: (req, file, cb) => {
    /*
        Files will be saved in the 'images' directory. This directory should already exist.
      */
    cb(null, path.join(__dirname, "..", "/propertyimages"));
  },
  filename: (req, file, cb) => {
    /*
        uuidv4() will generate a random ID that we'll use for the
        new filename. We use path.extname() to get
        the extension from the original file name and add that to the new
        generated ID. These combined will create the file name used
        to save the file on the server and will be available as
        req.file.pathname in the router handler.
      */
    console.log("PHOTO NAME=" + file.originalname)
    //const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
    const newFilename = file.originalname
    cb(null, newFilename);
  }
});

const upload2 = multer({ storage: storage2 });
router.post("/property", upload2.array("file"), (req, res, err) => {
  if (err) console.log(err);
  else console.log("Photo uploaded");
  /*
      We now have a new req.file object here. At this point the file has been saved
      and the req.file.filename value will be the name returned by the
      filename() function defined in the diskStorage configuration. Other form fields
      are available here in req.body.
    */

  console.log("TYPE OF:", typeof req.body._id);
  console.log("REQ BODY", req.body);
  req.files.forEach(file => {
    Properties.update(
      {
        _id: req.body._id
      },
      {
        $push: {
          photos: file.filename
        }
      },
      { returnOriginal: false }
    ).then(
      property => {
        console.log("Property photos updated", property);
        res.sendStatus(200).end();
      },
      err => {
        console.log("Unable to update photo", err);
        res.sendStatus(400).end();
      }
    );
  });
});

module.exports = router;
