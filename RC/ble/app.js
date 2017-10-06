var bleno = require('bleno');
var BlenoPrimaryService = bleno.PrimaryService;
var DBCCharacteristic = require('./characteristic');
console.log('bleno - dbc.rc.4wd');
var serviceID = '9a10ba1d-cd1c-4f00-9cca-1f3178d5fe8a';

bleno.on('stateChange', function(state) {
  console.log('on -> stateChange: ' + state);
  if (state === 'poweredOn') {
    bleno.startAdvertising('dbc.rc.4wd', [serviceID]);
  } else {
    bleno.stopAdvertising();
  }
});

bleno.on('advertisingStart', function(error) {
  console.log('on -> advertisingStart: ' + (error ? 'error ' + error : 'success'));

  if (!error) {
    bleno.setServices([
      new BlenoPrimaryService({
        uuid: serviceID,
        characteristics: [
          new DBCCharacteristic()
        ]
      })
    ]);
  }
});
