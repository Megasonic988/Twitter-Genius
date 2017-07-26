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
      if (res.statuses.length > 0)
        this.setState({tweets: res.statuses});
    });
  }
  componentWillMount() {
    Office.initialize = (reason) => {
      OfficeHelper.addSelectionChangedEventHandler(() => {
        OfficeHelper.getSelectedText()
          .then(selectedText => {
            if (selectedText) {
              return selectedText;
            } else {
              return OfficeHelper.getCurrentSentence();
            }
          })
          .then(text => {
            console.log('text: ', text)
            return TextAnalyticsHelper.getKeyPhrases(text);
          })
          .then(keyPhrases => {
            keyPhrases = keyPhrases.map(phrase => phrase.split(' ')[phrase.split(' ').length - 1]);
            keyPhrases = keyPhrases.filter((phrase, index) => index < 3);
            console.log('key phrases: ', keyPhrases)
            if (keyPhrases.length > 0 && keyPhrases[0] !== '') {
              this.GetTweets(keyPhrases.join(' '));
            }
          });
      });
    };
  }
  render() {
    return (
      <div className="App">
        {this.state.tweets.map((tweet, index) => {
          return (<p key={index} className="Tweet">{tweet.text}</p>);
        })}
      </div>
    );
  }
}

export default App;
