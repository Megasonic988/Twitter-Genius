import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as OfficeHelper from './OfficeHelper';
import * as TextAnalyticsHelper from './TextAnalyticsHelper';

const Twitter = require('twitter');
const Office = window.Office;
const OAUTH = "https://localhost:7777?text=";

class App extends Component {
  constructor() {
    super();
    this.state = {tweets: []};
  }
  GetTweets(searchString) {
    fetch(OAUTH + encodeURI(searchString)).then((res) => {
      return res.json();
    }).then((res) => {
      this.setState({tweets: res.statuses});
    });
  }
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
    TextAnalyticsHelper.getKeyPhrases("Apple's boss has promised to build three new manufacturing plants in the United States, according to an interview President Donald Trump has given to the Wall Street Journal.")
      .then(res => {
        console.log(res)
      })
    this.GetTweets("taco bell");
  }
  render() {
    return (
      <div className="App">
        {this.state.tweets.map((tweet) => {
          return (<p className="Tweet">{tweet.text}</p>);
        })}
      </div>
    );
  }
}

export default App;
