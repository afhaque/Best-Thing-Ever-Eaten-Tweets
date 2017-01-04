/*

Gameplan

1. Connect to a Twitter Account

2. Run a search for Best thing I ever ate

3. Choose a random tweet from the search results

4. Confirm the tweet I select is actually a new one.

5. Post that tweet on my twitter account.

6. Run the code such that it repeats every X number of minutes. 

7. Figure out how to deploy a worker with node. 

8. Stretch Target: Do a google image search of that phrase and then include a picture. 

---------------------------

Twitter API Stuff:
Consumer Key (API Key)  rpLZJxoLMFG4ursD9Oes4wUhW
Consumer Secret (API Secret)  NmJyEvsBlOwENbdzE2hu5v6ZkeGb0L2xhS6bjpWYMQbYhgT4s9

Access Token  590617948-G00CWZ7BEXf5mCQwaleMQcm5fuJ1TdD0WbVENIkQ
Access Token Secret Ptkw1HydCNj62OewpJuV9FJOQY4rs3l56KuN9iuVZri2J

*/

// Connected to Twitter
var Twitter = require('twitter');
var fs = require("fs")

var client = new Twitter({
  consumer_key: 'rpLZJxoLMFG4ursD9Oes4wUhW',
  consumer_secret: 'NmJyEvsBlOwENbdzE2hu5v6ZkeGb0L2xhS6bjpWYMQbYhgT4s9',
  access_token_key: '590617948-G00CWZ7BEXf5mCQwaleMQcm5fuJ1TdD0WbVENIkQ',
  access_token_secret: 'Ptkw1HydCNj62OewpJuV9FJOQY4rs3l56KuN9iuVZri2J'
});
 
var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);

    // Save Twitter feed to a text file 
    fs.writeFile('tweets.json', JSON.stringify(tweets, null, '\t'), (err) => {
      if (err) throw err;
      console.log('It\'s saved!');
    });

  }
});