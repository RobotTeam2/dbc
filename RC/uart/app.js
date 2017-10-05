var redis      = require('redis');
var SerialPort = require('serialport');
var fs = require('fs');

var files = fs.readdirSync('/dev');
files.forEach(function(file) {
  console.log(file);
});



var subscriber = redis.createClient(6379, 'localhost'); 
subscriber.subscribe('/dbc/webui2uart');
subscriber.on("message", function(channel, message) {
  console.log('message=<',message,'>');
});

var serialPort = new SerialPort("/dev/ttyS0", {
 baudrate: 112500
});

serialPort.on("open", function () {
  console.log('open');
 });

serialPort.on('data', function(data) {
  console.log('received data =<',data,'>');
});

serialPort.on('error', function(err) {
  console.log('err =<',err,'>');
});
