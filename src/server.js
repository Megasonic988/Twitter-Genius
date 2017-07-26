const express = require("express");
const app = express();
const Twitter = require('twitter');
const fs = require('fs');
const https = require('https');
const privateKey  = fs.readFileSync('key.pem');
const certificate = fs.readFileSync('cert.pem');

const KEY = "or1oaSQouidlMFlzNqoweDaas";
const SECRET = "m9SzMpRyrXGoBmhfYweQNQpd0gfBqfQOLRp1CSax8jBJ83vvXO";
const BEARER = "AAAAAAAAAAAAAAAAAAAAANa21gAAAAAAOFrVQ4loW0b2AJHNJfrANzzWmls%3Dcn02qQj9aIPJ0DKVykq7qGXR4mdYQgTw2euFNnRcEe8FumRmGP";

var credentials = {key: privateKey, cert: certificate};
var httpsServer = https.createServer(credentials, app);

let client = new Twitter({
  consumer_key: KEY,
  consumer_secret: SECRET,
  bearer_token: BEARER
});

function showtweets(obj) {
    console.log(obj);
}

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/", function(req, res) {
    client.get("search/tweets", {q: "donald trump"}, function(error, tweets, response){
        if(error) throw error;
        res.send(tweets);  // The favorites.
    });
});

httpsServer.listen(7777);