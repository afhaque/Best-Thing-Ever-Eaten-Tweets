/*

Game Plan

1. Connect to a Twitter Account (DONE)

2. Run a search for Best thing I ever ate (DONE)

3. Choose a random tweet from the search results (DONE)

4. Confirm the tweet I select is actually a new one. (DONE)

5. Post that tweet on my twitter account. (DONE)

- We need to grab more than 15 tweets (DONE)

6. Run the code such that it repeats every X number of minutes. (DONE)

7. Figure out how to deploy a worker with node. (DONE)

8. Stretch Target: Do a google image search of that phrase and then include a picture. (ONE OF THESE DAYS!)

---------------------------

*/

// Connected to Twitter
var Twitter = require('twitter');
var fs = require("fs")

var client = new Twitter({
  consumer_key: '3h64VvFIePtYL120yRMOuFCfW',
  consumer_secret: 'mq7iPSDI2F0iSOxUZXdF2QjCGc9ZZTtbhD7ZwTCSd4qmHnxSg9',
  access_token_key: '816450584534519808-9Mbu8luRGkFCDNs4wtVNi5FNEM5ckMx',
  access_token_secret: 'TXGSCkBsILLi5H0Bp0xMEqxRWRHZgEW0w23CbR5jjrNwO'
});

// Tweet Options
var all_tweets = [];
var historic_tweets = [];

// Main Code
var TweetThatFood = function(){

  // Run a Search for "Best Thing I Ever Ate"
  client.get('search/tweets', {q: 'Best Thing I Ever Ate', count: 100}, function(error, tweets, response) {
     // console.log(tweets);

     // Loop through all tweets possible
     for (tweet in tweets.statuses){

      // Add the tweet to our all_tweets list
      all_tweets.push({
        "text": tweets.statuses[tweet].text,
        "id": tweets.statuses[tweet].id,
        "name": tweets.statuses[tweet].user.name,
        "screen_name": tweets.statuses[tweet].user.screen_name,
        "location": tweets.statuses[tweet].user.location,
        "url": tweets.statuses[tweet].user.url});

    } 

      // Use boolean flag to ensure only "unique" tweets are used.
      var found_one = false;

      while(!found_one){

        // Random selection of tweets
        random_element = Math.floor(Math.random() * all_tweets.length-1) + 1;  

        // Choose a random tweet
        selected_tweet = all_tweets[random_element];

        if (!(selected_tweet in historic_tweets) && (selected_tweet.screen_name != "bestfoodeva4eva")){

          // Push the selected_tweet to historic_tweets
          historic_tweets.push(selected_tweet);
          found_one = true;

          // Test case for tweeting out
          client.post('statuses/update', {status: selected_tweet.text}, function(error, tweet, response) {
            if (!error) {
              console.log(tweet);
              
            }
          });

        }
      }

      // Save Twitter Objects in JSON
      fs.writeFile('contents.json', JSON.stringify(all_tweets, null, '\t'), (err) => {
        if (err) throw err;
      });

      // Save Twitter feed to a text file 
      fs.writeFile('tweets.json', JSON.stringify(tweets, null, '\t'), (err) => {
        if (err) throw err;
      });

      // Save Historic Tweets in JSON
      fs.writeFile('historic_tweets.json', JSON.stringify(historic_tweets, null, '\t'), (err) => {
        if (err) throw err;
      });

    });

}

// Call the function
TweetThatFood()
setInterval(TweetThatFood, 1200000);

