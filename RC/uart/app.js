var redis      = require('redis');
var SerialPort = require('serialport');
var fs = require('fs');

var files = fs.readdirSync('/dev/');
//console.log('files=<',files,'>');
var uartDevice = false;
files.forEach(function(file) {
  //console.log('file=<',file,'>');
  if(file.startsWith('ttyUSB')) {
    //console.log('file=<',file,'>');
    uartDevice = '/dev/' +file;
  }
});
console.log('uartDevice=<',uartDevice,'>');


function writeMotor(motor) {
  serialPort.write(JSON.stringify(servo),function(err) {
    if (err) {
      console.log('err=<',err,'>');
    } else {
      console.log('message written');
    }
  });
}

var subscriber = redis.createClient(6379, 'localhost'); 
subscriber.subscribe('/dbc/webui2uart');
subscriber.on("message", function(channel, message) {
  console.log('message=<',message,'>');
  if(message === 'forword') {
    var servo = {sp:50,ff:true,mt:'FL'};
    writeMotor(servo);
    servo.mt = 'FR';
    writeMotor(servo);
    servo.mt = 'BL';
    writeMotor(servo);
    servo.mt = 'BR';
    writeMotor(servo);
  }
});

var serialPort = new SerialPort(uartDevice, {
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
