import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const Twitter = require('twitter');

class App extends Component {
  componentWillMount() {
    console.log(Twitter)
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
