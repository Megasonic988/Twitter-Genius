# Twitter Wizard - a Microsoft Word add-in

## Inspiration
Wouldn't it be cool if you could see what others were thinking about what you're writing, as you write? As you type, Twitter Wizard will show you the hottest tweets relevant to your content, giving you additional inspiration during content creation.

This project was made for the [Microsoft OneWeek Hackathon 2017](https://blogs.microsoft.com/firehose/2017/07/24/microsofts-one-week-hackathon-kicks-off-this-year-with-nonprofits-hacking-alongside-employees/).

## Design

We use the [Azure Cognitive Services API](https://azure.microsoft.com/en-us/services/cognitive-services/text-analytics/) to parse the text the user is currently writing and then extract key phrases and sentiment.

We sent the results of key phrases and sentiment analysis to the [Twitter API](https://dev.twitter.com/rest/public), and then we get the tweets most relevant to the users' content. We display these tweets in a taskpane.

We use React for rendering the taskpane view.

## Get Started

First, cd into the /src directory and run `node server.js`. This will start the Node.js server for the Twitter API.  
Then, run `HTTPS=true yarn start` or `HTTPS=true npm start` in the root directory to start a local development server to host the add-in.  
1. Go to [Word Online](https://office.live.com/start/Word.aspx) and create a blank document.  
2. Go to Insert > Office Add-ins.  
3. Manage My Add-ins will open a menu where you can then choose Upload My add-in.  
4. Choose Browse and select the twitter-genius-manifest.xml file from the root of the project folder, and then choose Upload.  
5. Twitter Genius will load in Word.  
