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
  serialPort.write(JSON.stringify(motor),function(err) {
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
    var motor = {sp:50,ff:true,mt:'FL'};
    writeMotor(motor);    
    motor.mt = 'FR';
    writeMotor(motor);
    motor.mt = 'BL';
    writeMotor(motor);
    motor.mt = 'BR';
    writeMotor(motor);
  }
  if(message === 'back') {
    var motor = {sp:50,ff:false,mt:'FL'};
    writeMotor(motor);
    motor.mt = 'FR';
    writeMotor(motor);
    motor.mt = 'BL';
    writeMotor(motor);
    motor.mt = 'BR';
    writeMotor(motor);
  }
  if(message === 'left') {
    var motor = {sp:50,ff:false,mt:'FL'};
    writeMotor(motor);
    
    motor.ff = true;
    motor.mt = 'FR';
    writeMotor(motor);

    motor.ff = false;
    motor.mt = 'BL';
    writeMotor(motor);

    motor.ff = true;
    motor.mt = 'BR';
    writeMotor(motor);
  }
  if(message === 'right') {
    var motor = {sp:50,ff:true,mt:'FL'};
    writeMotor(motor);
    
    motor.ff = false;
    motor.mt = 'FR';
    writeMotor(motor);
    
    motor.ff = true;
    motor.mt = 'BL';
    writeMotor(motor);

    motor.ff = false;
    motor.mt = 'BR';
    writeMotor(motor);
  }
  if(message === 'stop') {
    var motor = {sp:255,ff:true,mt:'FL'};
    writeMotor(motor);
    motor.mt = 'FR';
    writeMotor(motor);
    motor.mt = 'BL';
    writeMotor(motor);
    motor.mt = 'BR';
    writeMotor(motor);
  }
});

var serialPort = new SerialPort(uartDevice, {
 baudrate: 115200
});

serialPort.on("open", function () {
  console.log('open');
 });

serialPort.on('data', function(data) {
  console.log('received data =<',data,'>');
  console.log('received data.toString(utf8) =<',data.toString('utf8'),'>');
  
});

serialPort.on('error', function(err) {
  console.log('err =<',err,'>');
});
