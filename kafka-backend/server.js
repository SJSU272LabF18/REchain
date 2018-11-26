var connection = new require("./kafka/Connection");
//topics files
//var signin = require('./services/signin.js');
var Login = require("./services/login.js");
var ownerLogin = require("./services/ownerlogin.js");
var SignUp = require("./services/signup.js");
var PropertyDetails = require("./services/propertydetails.js");
var Home = require("./services/home.js");
var Dashboard = require("./services/dashboard.js");
var SearchResults = require("./services/searchresults.js");
var BookProperty = require("./services/bookproperty.js");
var GetProfile = require("./services/getprofile.js");
var PostProfile = require("./services/postprofile.js");
var ListYourProperty = require("./services/lyp.js");
var SendMessage = require("./services/sendmessage.js");
var Inbox = require("./services/inbox.js");
var GetTransactionHistory = require("./services/transactionHistory.js");
var BuyProperty = require("./services/buyproperty.js");

function handleTopicRequest(topic_name, fname) {
  //var topic_name = 'root_topic';
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  console.log("server is running ");
  consumer.on("message", function(message) {
    console.log("message received for " + topic_name + " ", fname);
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    fname.handle_request(data.data, function(err, res) {
      console.log("after handle" + res);
      var payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res
          }),
          partition: 0
        }
      ];
      producer.send(payloads, function(err, data) {
        console.log(data);
      });
      return;
    });
  });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("post_login", Login);
handleTopicRequest("post_ownerlogin", ownerLogin);
handleTopicRequest("post_signup", SignUp);
handleTopicRequest("get_propertydetails", PropertyDetails);
handleTopicRequest("get_home", Home);
handleTopicRequest("get_dashboard", Dashboard);
handleTopicRequest("get_searchresults", SearchResults);
handleTopicRequest("post_bookproperty", BookProperty);
handleTopicRequest("get_profile", GetProfile);
handleTopicRequest("post_profile", PostProfile);
handleTopicRequest("post_lyp", ListYourProperty);
handleTopicRequest("post_sendmessage", SendMessage);
handleTopicRequest("get_inbox", Inbox);
handleTopicRequest("get_transaction_history", GetTransactionHistory);
handleTopicRequest("post_buyproperty", BuyProperty);