var bleno = require('bleno');
var BlenoPrimaryService = bleno.PrimaryService;
var DBCCharacteristic = require('./characteristic');
console.log('bleno - dbc.rc.4wd');
bleno.on('stateChange', function(state) {
  console.log('on -> stateChange: ' + state);
  if (state === 'poweredOn') {
    bleno.startAdvertising('dbc.rc.4wd', ['ac5636ee-3d36-4afe-9662-ec47fbfe1dd0']);
  } else {
    bleno.stopAdvertising();
  }
});

bleno.on('advertisingStart', function(error) {
  console.log('on -> advertisingStart: ' + (error ? 'error ' + error : 'success'));

  if (!error) {
    bleno.setServices([
      new BlenoPrimaryService({
        uuid: 'ac5636ee-3d36-4afe-9662-ec47fbfe1dd0',
        characteristics: [
          new DBCCharacteristic()
        ]
      })
    ]);
  }
});
