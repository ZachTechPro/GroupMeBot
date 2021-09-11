var HTTPS = require('https');
var cool = require('cool-ascii-faces');
//var test = require('funny-commands');

var botID = process.env.BOT_ID;

// This is the function where the bot gets the commands
function respond() {
  //Here is the request
  var request = JSON.parse(this.req.chunks[0])
  var coolGuyRegex = /^\/cool guy$/;
  var testRegex =  /^\/test$/;

  handleCoolGuy(request, coolGuyRegex);
 // handleTest(test, testRegex);

}

function handleTest(request, testRegex){
  if(request.text && testRegex.test(request.text)) {
    this.res.writeHead(200);
    postTestMessage();
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function handleCoolGuy(request, coolGuyRegex){
  if(request.text && coolGuyRegex.test(request.text)) {
    this.res.writeHead(200);
    postCoolGuyMessage();
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postTestMessage(){
  var botResponse, options, body, botReq;

  botResponse = test();

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
    if(res.statusCode == 202) {
      //neat
    } else {
      console.log('rejecting bad status code ' + res.statusCode);
    }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}

function postCoolGuyMessage() {
  var botResponse, options, body, botReq;

  botResponse = cool();

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;
