// Подключение только в браузере Firefox с настройками about:config network.websocket.allowInsecureFromHTTPS ;true

  var ws = new WebSocket('ws://192.168.1.4'); /// Открытие сокет-соединения с сервером матрицы.
  
  var led = document.getElementById('led');
  var color = document.getElementById('color');
  var sendPixel = document.getElementById('sendPixel');
  var clearAll = document.getElementById('clearAll');
  var chaser = document.getElementById('chaser');
  var consoleLED = document.getElementById('consoleLED');
  var btnInfo = document.getElementById('btnInfo');


/// Сокет-события
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
consoleLED.innerHTML += evt.data + '\<br>'
}
  };
  
  sendPixel.onclick = evt => {
    var randColor = Math.floor((Math.random()*255) + 1)+','+Math.floor((Math.random()*255) +   1)+','+Math.floor((Math.random()*255) + 1);
    var ledNumber = Math.floor((Math.random()*255) + 1);
    var cv = color.value == 'Random'? randColor : color.value;
    var lv = led.value == 'Random'? ledNumber : led.value;
    
    ws.send(lv +','+ cv );  /// Отправить на сервер номер светодиода и его цвет в формате (R,G,B).
    
    consoleLED.innerHTML += ('LED:  '+lv +'     RGB-цвет: '+cv +'  Сообщение на сервер: '+"\'"+lv +','+ cv + "\'"+'\<br>');
    consoleLED.style.background = 'rgb('+cv+')';

  };

  clearAll.onclick = evt => {
    ws.send("clearAll");
    consoleLED.innerHTML = '';
  };

  chaser.onclick = evt => {
    ws.send("chaser");
    consoleLED.innerHTML = 'Chaser';
  };


