var util = require('util');
var bleno = require('bleno');
var redis = require("redis");


var BlenoCharacteristic = bleno.Characteristic;

var DBCCharacteristic = function() {
  EchoCharacteristic.super_.call(this, {
    uuid: 'ac5636ee-3d36-4afe-9662-ec47fbfe1dd0',
    properties: ['read', 'write', 'notify'],
    value: null
  });

  this._value = new Buffer(0);
  this._updateValueCallback = null;
};

util.inherits(DBCCharacteristic, BlenoCharacteristic);

DBCCharacteristic.prototype.onReadRequest = function(offset, callback) {
  console.log('EchoCharacteristic - onReadRequest: value = ' + this._value.toString('hex'));

  callback(this.RESULT_SUCCESS, this._value);
};

DBCCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
  this._value = data;

  //console.log('EchoCharacteristic - onWriteRequest: value = ' + this._value.toString('hex'));
  console.log('EchoCharacteristic - onWriteRequest: value = ' + this._value);
  client.send(this._value, 0, this._value.length, 41234, "localhost");
  if (this._updateValueCallback) {
    console.log('EchoCharacteristic - onWriteRequest: notifying');

    this._updateValueCallback(this._value);
  }

  callback(this.RESULT_SUCCESS);
};

DBCCharacteristic.prototype.onSubscribe = function(maxValueSize, updateValueCallback) {
  console.log('EchoCharacteristic - onSubscribe');

  this._updateValueCallback = updateValueCallback;
};

DBCCharacteristic.prototype.onUnsubscribe = function() {
  console.log('EchoCharacteristic - onUnsubscribe');

  this._updateValueCallback = null;
};

module.exports = DBCCharacteristic;
