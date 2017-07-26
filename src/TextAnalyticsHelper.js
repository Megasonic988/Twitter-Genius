const apiKey = '48a916ebc09344bab1c0a41997525674';
const keyPhrasesPath = 'https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases';
const sentimentPath = 'https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment';

const headers = new Headers();
headers.append('Ocp-Apim-Subscription-Key', apiKey);
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');

function createPostBody(text) {
  return JSON.stringify({
    documents: [{
      language: "en",
      id: "1",
      text: text
    }]
  });
}

function createPostOptions(text) {
  return {
    method: 'POST',
    headers: headers,
    body: createPostBody(text)
  };
};

export function getKeyPhrases(text) {
  return fetch(keyPhrasesPath, createPostOptions(text))
    .then(function(res) {
      return res.json();
    })
    .then(function(res) {
      return res.documents[0].keyPhrases;
    });
}

export function getSentiment(text) {
  return fetch(sentimentPath, createPostOptions(text))
    .then(function(res) {
      return res.json();
    })
    .then(function(res) {
      return res.documents[0].score;
    });
}