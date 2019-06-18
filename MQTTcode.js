var mqtt = require("tinyMQTT").create("m24.cloudmqtt.com", {
    clientId: "tdevice",
    username: "jriiypoc",
    password: "MGZl8VTTlcuc",
    port: 10369 
});

mqtt.on("connected", function(){
    console.log("on"); 
    mqtt.subscribe("/teplica");
    mqtt.publish("/teplica","Теплица-сервер подключилась к брокеру MQTT-сообщений"); 
});

mqtt.on("message", function(msg){
    console.log(msg.topic);
    console.log(msg.message);
});

mqtt.on("published", function(){
    console.log("message sent");
});

mqtt.on("disconnected", function(){
    console.log("disconnected");
});




var wifi = require("Wifi");
var clients = [];

//var WIFI_NAME = "cisco.irk.ru";
//var WIFI_OPTIONS = { password : "Ve!c0dinC1n@" };

var WIFI_NAME = "vaduga";
var WIFI_OPTIONS = { password : "9501203230" };


wifi.connect(WIFI_NAME, WIFI_OPTIONS, function(err) {
  if (err) {
    console.log("Connection error: "+err);
    return;
  }
  console.log("Wi-Fi connected!");
  mqtt.connect();
});


 // Print IP address
  wifi.getIP((err, info) => {
    if (err !== null) {
      throw err;
    }
   print("http://"+info.ip);
    
  });





