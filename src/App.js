import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as OfficeHelper from './OfficeHelper';

const Twitter = require('twitter');
const Office = window.Office;

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
