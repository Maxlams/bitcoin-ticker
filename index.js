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

// create an instance of Express
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html"); // get from index.html
});

app.post("/", function(req, res) {

  let crypto = req.body.crypto; // get cryptocurrency from HTML
  let fiat = req.body.fiat; // get fiat currency from HTML
  let bitcoinURL = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";
  let wholeURL = bitcoinURL + crypto + fiat; // final HTTP request link

  request(wholeURL, function(error, response, body) {

    let data = JSON.parse(body);
    let price = data.last; // fetch last price
    let currDate = data.display_timestamp; // fetch timestamp

    res.write("<p>The current date and time is " + currDate + ".</p>");
    res.write("<h1>The price of " + crypto + " is currently " + price + fiat + ".</h1><h2>(this is a work in progress!)</h2>");

    res.send();

  });

});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server running on port 3000.");
});
