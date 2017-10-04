/**
* @file
* 
*/
var DBC = DBC || {};
DBC.notify = DBC.notify || {};
DBC.notify.uri_ = 'ws://' + location.hostname + ':38081';


$(document).ready(function(){
  DBC.notify.wsConnectCheckTimer = setTimeout(DBC.notify.onWSConnectCheck_,100);
});





DBC.notify.onWSTryOpen_ = function(){
  if(DBC.notify.ws_) {
    console.log('DBC.notify.ws_=<',DBC.notify.ws_,'>');
    return;
  }
  DBC.notify.ws_ = new WebSocket(DBC.notify.uri_); 
  DBC.notify.ws_.onopen = DBC.notify.wsOpen_;
  DBC.notify.ws_.onclose = DBC.notify.wsClose_;
  DBC.notify.ws_.onerror = DBC.notify.wsError_;
  DBC.notify.ws_.onmessage = DBC.notify.wsMessage_;
}

DBC.notify.onWSConnectCheck_ = function(){
  DBC.notify.onWSTryOpen_();
};




DBC.notify.wsOpen_ = function(){
  console.log('DBC.notify.ws_=<',DBC.notify.ws_,'>');
};

DBC.notify.wsClose_ = function(){
  console.log('SENSOR.notify.ws_=<',DBC.notify.ws_,'>');
  DBC.notify.ws_ = null;
};

DBC.wsError_ = function(e){
  console.error('DBC.notify.ws_=<',DBC.notify.ws_,'>');
  console.error('e=<',e,'>');
  DBC.notify.ws_ = null;
};

DBC.notify.wsMessage_ = function(evt){
  //console.log('DBC.notify.ws_=<',DBC.notify.ws_,'>');
  //console.log('evt=<',evt,'>');
  let msg = JSON.parse(evt.data);
  console.log('msg=<',msg,'>');
};
