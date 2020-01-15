//
// If you are using the Atom editor with
//   the linter-jshint package installed,
//   add the following comment below.
//   Otherwise, you can delete it.
// 

//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});



app.post("/", function(req, res) {

  var crypto = req.body.crypto; // from HTML
  var fiat = req.body.fiat; // from HTML
  var bitcoinURL = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";
  var wholeURL = bitcoinURL + crypto + fiat; // final HTTP request link

  request(wholeURL, function(error, response, body) { // ("url", function(error, response, body))

    var data = JSON.parse(body); // turns JSON (JavaScript Obejct Notation) file into JS file
    var price = data.last; // key = last
    var currDate = data.display_timestamp; // key = display_timestamp

    res.write("<p>" + currDate + "</p>");
    res.write("<h1>The current price of " + crypto + " is " + price + fiat + "</h1>");

    res.send();

  });

});

app.listen(3000, function() {
  console.log("Server running on port 3000.");
});




