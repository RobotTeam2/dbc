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
  console.log('JSON.stringify(motor)=<',JSON.stringify(motor),'>');
  serialPort.flush();
  serialPort.write(JSON.stringify(motor),'utf8',function(err) {
    if (err) {
      console.log('err=<',err,'>');
    } else {
      console.log('message written');
    }
  });
  serialPort.drain();
}

var subscriber = redis.createClient(6379, 'localhost'); 
subscriber.subscribe('/dbc/webui2uart');
subscriber.on("message", function(channel, message) {
  console.log('message=<',message,'>');
  if(message === 'forword') {
    var motor = {
      FL:{sp:50,ff:true},
      FR:{sp:50,ff:true},
      BL:{sp:50,ff:true},
      BR:{sp:50,ff:true},
    };
    writeMotor(motor);
  }
  if(message === 'back') {
    var motor = {
      FL:{sp:50,ff:false},
      FR:{sp:50,ff:false},
      BL:{sp:50,ff:false},
      BR:{sp:50,ff:false},
    };
    writeMotor(motor);
  }
  if(message === 'left') {
    var motor = {
      FL:{sp:50,ff:false},
      FR:{sp:50,ff:true},
      BL:{sp:50,ff:false},
      BR:{sp:50,ff:true},
    };
    writeMotor(motor);
  }
  if(message === 'right') {
    var motor = {
      FL:{sp:50,ff:true},
      FR:{sp:50,ff:false},
      BL:{sp:50,ff:true},
      BR:{sp:50,ff:false},
    };
    writeMotor(motor);
  }
  if(message === 'stop') {
    var motor = {
      FL:{sp:255,ff:true},
      FR:{sp:255,ff:true},
      BL:{sp:255,ff:true},
      BR:{sp:255,ff:true},
    };
    writeMotor(motor);
  }
});

var serialPort = new SerialPort(uartDevice, {
 baudRate: 115200
});

serialPort.on("open", function () {
  console.log('open');
 });

serialPort.on('data', function(data) {
  console.log('received data =<',data.toString('utf8'),'>');
});

serialPort.on('error', function(err) {
  console.log('err =<',err,'>');
});
