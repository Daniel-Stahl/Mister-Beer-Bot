console.log('The replier bot is starting');

var Twit = require('twit');

var config = require('./config');
var T = new Twit(config);

// Setting up a user stream
var stream = T.stream('user');

// Anytime someone tweets me
stream.on('tweet', tweetEvent);

//The trigger to tweet
function tweetIt(txt) {

	var tweet = {
	  status: txt
	}

	T.post('statuses/update', tweet, tweeted);

	function tweeted(err, data, response) {
	  if (err) {
	  	console.log('error:', err);
	  } else {
	    console.log("It worked!");
	  }
	}
}

function tweetEvent(eventMsg) {
  // get a tweet!
  // var fs = require('fs');
  // var json = JSON.stringify(eventMsg,null,2);
  // fs.writeFile("tweet.json", json);

  var replyto = eventMsg.in_reply_to_screen_name;
  var text = eventMsg.text;
  var from = eventMsg.user.screen_name;
  var time = eventMsg.created_at;
  var ranNum = Math.floor((Math.random() * 100) + 1);
  //var beer 
  //var brewery

  console.log(from + ' ' + time);

  var randomTweet = [
  		'@' + from + ' you are awesome here is ' + ranNum + ' as a random number.',
  		'@' + from + ' You win ' + ranNum + ' as a random number.',
  		'@' + from + ' I am a bot ' + ranNum + ' as a random number.',
  		'@' + from + ' This is testing ' + ranNum + ' as a random number.',
  		'@' + from + ' This is a Tweet ' + ranNum + ' as a random number.',
  		'@' + from + ' beep boop ' + ranNum + ' as a random number.',
  		'@' + from + ' Mister Beer Bot is ALIVE! ' + ranNum + ' as a random number.',
  	];

//replyto === 'mbbtest' && 
// The bot sends out a random beer from the db
  if (text === '@mbbtest beer me'){
  	var newtweet = randomTweet[Math.floor(Math.random()*randomTweet.length)]

  	tweetIt(newtweet);
  } 
  // else {
  // 	var errorTweet = '@' + from + ' Sorry can not compute. Try using one of my commands (' + ranNum + ')';
  	
  // 	tweetIt(errorTweet);
  // }
}
