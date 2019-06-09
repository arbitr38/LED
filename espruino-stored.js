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
});


 // Print IP address
  wifi.getIP((err, info) => {
    if (err !== null) {
      throw err;
    }
   print("http://"+info.ip);
    startServer();
  });

// Create and start server
function startServer() {
  const s = require('ws').createServer(pageHandler);
  s.on('websocket', wsHandler);
  s.listen(80);
}

// Page request handler
function pageHandler(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  
  
  
  res.end(`<html>
<head>
<meta charset="utf-8">
<script>
window.onload = () => {
  var ws = new WebSocket('ws://' + location.host, 'protocolOne');
  var lamp = document.getElementById('lamp');
  var led = document.getElementById('led');
  var color = document.getElementById('color');
  var sendPixel = document.getElementById('sendPixel');
  var clearAll = document.getElementById('clearAll');
  var rainbow = document.getElementById('rainbow');
  var chaser = document.getElementById('chaser');
  var consoleLED = document.getElementById('consoleLED');
  var btnInfo = document.getElementById('btnInfo');
  
  ws.onopen = () => {
consoleLED.innerHTML += "Socket opened (connected) at: ";
}
 ws.onclose = () => {
consoleLED.innerHTML = "Socket closed";
}
  ws.onmessage = evt => {
switch (evt.data) {
case 'DOWN':
btnInfo.innerHTML = evt.data;
break;
case 'UP':
btnInfo.innerHTML = evt.data;
break;

default:
  consoleLED.innerHTML += evt.data + '\<br>';
break;
}
  };
  
  sendPixel.onclick = evt => {
    var r = Math.floor((Math.random()*255) + 1)+','+Math.floor((Math.random()*255) + 1)+','+Math.floor((Math.random()*255) + 1);
    var l = Math.floor((Math.random()*255) + 1);
    var cv = color.value == 'Random'? r : color.value;
    var lv = led.value == 'Random'? l : led.value;
    ws.send(lv +','+ cv );
    consoleLED.innerHTML += ('LED:  '+lv +'     RGB-цвет: '+cv +'  Сообщение на сервер: '+"\'"+lv +','+ cv + "\'"+'\<br>');
    consoleLED.style.background = 'rgb('+cv+')';

  };

  clearAll.onclick = evt => {
    ws.send("clearAll");
consoleLED.innerHTML = '';
  };

/* rainbow.onclick = evt => {
    ws.send("rainbow");
consoleLED.innerHTML = 'Радуга';
  }; */

chaser.onclick = evt => {
    ws.send("chaser");
consoleLED.innerHTML = 'Chaser';
  };


};
</script>
</head>
<body>
<br><br><br>

<div style="text-align: center;">
<IMG SRC="https://static.tildacdn.com/tild3562-3030-4731-b838-663632616337/EST_logo.svg" style="max-width: 130px;width: 130px; height: auto;"><br><br>
    <p>Включить LED:
    <select id="led">

<option value="Random">Случайный номер</option>
<option value="25">25</option>
<option value="26">26</option>
<option value="33">33</option>
<option value="34">34</option>
<option value="100">100</option>
<option value="36">36</option>
<option value="37">37</option>
<option value="105">105</option>
<option value="39">39</option>
<option value="175">175</option>
<option value="44">44</option>
<option value="47">47</option>
<option value="190">190</option>
<option value="49">49</option>
<option value="50">50</option>
<option value="252">252</option>
    </select>
<span>Цвет:</span>
<select id="color">
      <option value='Random'>Случайный цвет</option>
      <option value='210, 105, 30'>Chocolate</option>
      <option value='124, 252, 0'>LawnGreen</option>
      <option value='42,140,156'>Блестящий зеленовато-синий</option>
      <option value='155,17,30'>Рубиново-красный</option>
      <option value='255,203,219'>Бледно розоватый</option>
      <option value='121,223,232'>Бирюзово-голубой Крайола</option>
      </select>
<button id="sendPixel">Отправить</button>
<button id="clearAll">Очистить матрицу</button><br><br><br>
<button id="chaser">Chaser</button><br><br>

<div id='consoleLED'></div>
<div id='btnInfo'></div>
</div>
  </p>
</body>
</html>`);
}


//// its mine

var ledState = true;
var arr = new Uint8ClampedArray(256*3);
pinMode(NodeMCU.D4, 'input_pullup'); // для кнопки


///////  CHASER
function chaser() {
var led_count = 150;
var rgb = new Uint8ClampedArray(led_count * 3);

var pos = 0;
  
function getPattern() {
  pos = (pos + 1) % led_count;

  rgb[pos * 3 + 0] = 170; // r
  rgb[pos * 3 + 1] = 140 ;  // g
  rgb[pos * 3 + 2] = 55; // b

  for(var i = 0; i < led_count * 3; i++)
    rgb[i] *= 0.9;

  return rgb;
}
  
  
var chaser = setInterval(function() {
  require("neopixel").write(NodeMCU.D1, getPattern());
}, 10);
  
  
setTimeout(function(){clearInterval(chaser);arr.fill(0);require("neopixel").write(NodeMCU.D1, arr);}, 7000); 
  

}

////// RAINBOW
function rainbow() {
var led_count = 80;
var rgb = new Uint8ClampedArray(led_count * 3);

var pos = 0;
function getPattern() {
  pos++;
  for (var i=0;i<rgb.length;) {
    rgb[i++] = (1 + Math.sin((i+pos)*0.1324)) * 127;
    rgb[i++] = (1 + Math.sin((i+pos)*0.1654)) * 127;
    rgb[i++] = (1 + Math.sin((i+pos)*0.1)) * 127;
  }
  return rgb;
}
  
var rain = setInterval(function() {
  require("neopixel").write(NodeMCU.D1, getPattern());
}, 50);
  
  
setTimeout(function(){clearInterval(rain);arr.fill(0);require("neopixel").write(NodeMCU.D1, arr);}, 5000); 
  
}


//just to check all pixels

function all() {

for(var i=100; i< 200;){
  arr[i++] = 255;
  arr[i++] = 0;
  arr[i++] = 150;
}

require("neopixel").write(NodeMCU.D1, arr);
}


/////



// WebSocket request handler
function wsHandler(ws) {
  
  clients.push(ws);
  broadcast(wifi.getIP().ip);
  
  ws.on('message', msg => {
    console.log(msg);
    ledState = ledState ? false : true;  
//    digitalWrite(D2, ledState); // system LED
    digitalWrite(NodeMCU.D3, !ledState); // beeper + lamp
    switch (msg) {
  case "clearAll":
    arr.fill(0);
    require("neopixel").write(NodeMCU.D1, arr);
    
    break;
  case "rainbow":
    rainbow();
    break;
  case "chaser":
    chaser();
    break;
  default:
    let s=msg.split(',');
    arr.set([s[2],s[1],s[3]], s[0]*3);
  require("neopixel").write(NodeMCU.D1, arr);
    break;
}
    
  });
  
  ws.on('close', evt => {
    var x = clients.indexOf(ws);
    if (x > -1) {
      clients.splice(x, 1);
    }
    console.log('ClosingEST');
  });
}

// Send msg to all current websocket connections
function broadcast(msg) {
  clients.forEach(cl => cl.send(msg));
}

// Watch for button events (rising and falling)
setWatch(evt => {
broadcast(digitalRead(NodeMCU.D4) == 1 ? 'UP' : 'DOWN');
}, NodeMCU.D4, {repeat: true, edge: 'both', debounce: 50});



