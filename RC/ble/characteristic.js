var util = require('util');
var bleno = require('bleno');
var redis = require("redis");


var publisher  = redis.createClient();
var channel = '/dbc/webui2uart';

var BlenoCharacteristic = bleno.Characteristic;

var characterID = '9a10ba1d-cd1c-4f00-9cca-1f3178d5fe8a';

var DBCCharacteristic = function() {
  DBCCharacteristic.super_.call(this, {
    uuid: characterID,
    properties: ['read', 'write', 'notify'],
    value: null
  });

  this._value = new Buffer(0);
  this._updateValueCallback = null;
};

util.inherits(DBCCharacteristic, BlenoCharacteristic);

DBCCharacteristic.prototype.onReadRequest = function(offset, callback) {
  console.log('DBCCharacteristic - onReadRequest: value = ' + this._value.toString('hex'));

  callback(this.RESULT_SUCCESS, this._value);
};

DBCCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
  console.log('DBCCharacteristic - onWriteRequest: value=<',data,'>');
  console.log('DBCCharacteristic - onWriteRequest: offset=<',offset,'>');
  this._value = data;

  //console.log('DBCCharacteristic - onWriteRequest: value = ' + this._value.toString('hex'));
  console.log('DBCCharacteristic - onWriteRequest: value=<',this._value.toString('hex'),'>');
  publisher.publish(channel, this._value).toString('utf8');
  if (this._updateValueCallback) {
    console.log('DBCCharacteristic - onWriteRequest: notifying');

    this._updateValueCallback(this._value);
  }

  callback(this.RESULT_SUCCESS);
};

DBCCharacteristic.prototype.onSubscribe = function(maxValueSize, updateValueCallback) {
  console.log('DBCCharacteristic - onSubscribe');

  this._updateValueCallback = updateValueCallback;
};

DBCCharacteristic.prototype.onUnsubscribe = function() {
  console.log('DBCCharacteristic - onUnsubscribe');

  this._updateValueCallback = null;
};

module.exports = DBCCharacteristic;
