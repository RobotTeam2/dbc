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
if(uartDevice === false) {
  uartDevice = '/dev/ttyS1';
}
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

var readClient = redis.createClient(6379, 'localhost'); 

var gBaseMotorSpeed = 50;

var subscriber = redis.createClient(6379, 'localhost'); 
subscriber.subscribe('/dbc/webui2uart');
subscriber.on("message", function(channel, message) {
  console.log('message=<',message,'>');
  if(message === 'forword') {
    var motor = {
      FL:{s:gBaseMotorSpeed,f:1},
      FR:{s:gBaseMotorSpeed,f:1},
      BL:{s:gBaseMotorSpeed,f:1},
      BR:{s:gBaseMotorSpeed,f:1},
    };
    writeMotor(motor);
  }
  if(message === 'back') {
    var motor = {
      FL:{s:gBaseMotorSpeed,f:0},
      FR:{s:gBaseMotorSpeed,f:0},
      BL:{s:gBaseMotorSpeed,f:0},
      BR:{s:gBaseMotorSpeed,f:0},
    };
    writeMotor(motor);
  }
  if(message === 'left') {
    var motor = {
      FL:{s:gBaseMotorSpeed,f:0},
      FR:{s:gBaseMotorSpeed,f:1},
      BL:{s:gBaseMotorSpeed,f:0},
      BR:{s:gBaseMotorSpeed,f:1},
    };
    writeMotor(motor);
  }
  if(message === 'right') {
    var motor = {
      FL:{s:gBaseMotorSpeed,f:1},
      FR:{s:gBaseMotorSpeed,f:0},
      BL:{s:gBaseMotorSpeed,f:1},
      BR:{s:gBaseMotorSpeed,f:0},
    };
    writeMotor(motor);
  }
  if(message === 'stop') {
    var motor = {
      FL:{s:254,f:1},
      FR:{s:254,f:1},
      BL:{s:254,f:1},
      BR:{s:254,f:1},
    };
    writeMotor(motor);
  }
  if(message.startsWith('speed:=<')) {
    var speed = parseInt(message.replace('speed:=<').replace('>'));
    console.log('speed=<',speed,'>');
    readClient.set('/dbc/speed',);
    readClient.get('/dbc/speed',function(err, val) {
      if(err) {
         console.log('err=<',err,'>');
      } else {
        console.log('val=<',val,'>');
        var speed = parseInt(val);
        if(speed > 1 && speed < 256) {
           gBaseMotorSpeed = 256 - speed;
        }
      }
    });
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
