import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as OfficeHelper from './OfficeHelper';

const Office = window.Office;

const OAUTH = "https://localhost:7777";

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
    Office.initialize = function (reason) {
      OfficeHelper.addSelectionChangedEventHandler(function() {
        OfficeHelper.getSelectedText()
          .then(selectedText => {
            if (selectedText) {
              return selectedText;
            } else {
              return OfficeHelper.getCurrentSentence();
            }
          })
          .then(text => {
            console.log(text);
          });
      });
    };
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
