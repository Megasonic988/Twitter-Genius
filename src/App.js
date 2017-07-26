import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const Twitter = require('twitter');

const KEY = "or1oaSQouidlMFlzNqoweDaas";
const SECRET = "m9SzMpRyrXGoBmhfYweQNQpd0gfBqfQOLRp1CSax8jBJ83vvXO";
const BEARER = "AAAAAAAAAAAAAAAAAAAAANa21gAAAAAAOFrVQ4loW0b2AJHNJfrANzzWmls%3Dcn02qQj9aIPJ0DKVykq7qGXR4mdYQgTw2euFNnRcEe8FumRmGP";
const OAUTH = "https://localhost:7777";

let cat = KEY + ":" + SECRET;
let credentials = new Buffer(cat).toString("base64");

function GetBearerToken() {
    let ajax = new XMLHttpRequest();
    ajax.onload = ShowTweets;
    ajax.open("GET", OAUTH, true);
    ajax.send();
}

function ShowTweets() {
    console.log(JSON.parse(this.responseText));
}

class App extends Component {
  componentWillMount() {
    GetBearerToken();
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to lol.
        </p>
      </div>
    );
  }
}

export default App;
