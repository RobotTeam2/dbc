var redis      = require('redis');
var subscriber = redis.createClient(6379, 'localhost');
 
subscriber.subscribe('/dbc/webui2uart');
subscriber.on("message", function(channel, message) {
  console.log('message=<',message,'>');
});
