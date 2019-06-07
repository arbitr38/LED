
var NUM_OF_LEDS = 256;
var arr = new Uint8ClampedArray(NUM_OF_LEDS*3);
var def = [100,4,4];

function single(number, color) {
  arr.set(color, number*3);
  require("neopixel").write(NodeMCU.D1, arr);
}

function clear() {
  
  
arr.fill(0);

require("neopixel").write(NodeMCU.D1, arr);
  
}

function all() {

for(var i=0; i< arr.length;){
  arr[i++] = 255;
  arr[i++] = 0;
  arr[i++] = 150;
}

require("neopixel").write(NodeMCU.D1, arr);
}

