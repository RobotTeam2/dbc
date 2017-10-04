var WebSocketServer = require('websocket').server;
var http = require('http');
var config = require('./config.js');
var redis = require("redis");

 
var server = http.createServer(function(request, response) {
  console.log((new Date()) + ' Received request for ' + request.url);
	response.writeHead(200);
	response.end();
});

server.listen(config.port, function() {
	console.log((new Date()) + ' Server is listening on port ' + config.port );
});	
 
wsServer = new WebSocketServer({
  httpServer: server,
  // You should not use autoAcceptConnections for production 
  // applications, as it defeats all standard cross-origin protection 
  // facilities built into the protocol and the browser.  You should 
  // *always* verify the connection's origin and decide whether or not 
  // to accept it. 
  autoAcceptConnections: false
});
 
function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed. 
  return true;
}

var gWSConnect ={};

wsServer.on('request', function(request) {
  if (!originIsAllowed(request.origin)) {
    // Make sure we only accept requests from an allowed origin 
    request.reject();
    console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
    return;
  }
	
  var connection = request.accept('', request.origin);
	console.log(request.key);
  console.log((new Date()) + ' Connection accepted.');
  connection.key = request.key;
	
  gWSConnect[connection.key] = connection;
	connection.on('connect', function() {
		console.log('----------- web socket will connect ----------');
  });
  connection.on('close', function(reasonCode, description) {
		console.log('connection.key=<',connection.key,'>');
    delete gWSConnect[connection.key];
		console.log('reasonCode=<',reasonCode,'>');
		console.log('description=<',description,'>');
		console.log('----------- web socket will close ----------');
  });
});


var Sub = redis.createClient(config.redis_port,config.redis_host);

Sub.on("error", function (err) {
	console.error("err=<",err,'>');
});
console.log("Sub=<",Sub,'>');

Sub.subscribe('/dbc/webui2uart');
Sub.on("message", function (channel, message) {
	console.log("channel=<",channel,'>');
	console.log("message=<",message,'>');
  var allKeys = Object.keys(gWSConnect);
	console.log("allKeys=<",allKeys,'>');
  for(var index in allKeys){
    console.log("index=<",index,'>');
    var key = allKeys[index];
    console.log("key=<",key,'>');
    var connect = gWSConnect[key]
    connect.sendUTF(message);
  }
});
