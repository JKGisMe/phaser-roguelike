import * as mapGen from './cellularAutomata';

// font size (should be named font size)
var FONT = 32;

// map dimensions
var ROWS = 20; // 20
var COLS = 60; // 60

// number of actors per level including player
var ACTORS = 10;

var map;
var asciiDisplay;

// initialize phaser and call create() after
var game = new Phaser.Game(COLS * FONT * 0.6, ROWS * FONT, Phaser.Auto, null, {create: create});

function create() {
  // init keyboard
  game.input.keyboard.addCallbacks(null, null, onKeyUp);

  map = mapGen.default.generateMap(map, ROWS, COLS);

  // init screen
  asciiDisplay = [];
  var newRow;
  for (var y = 0; y < ROWS; y++){
    newRow = [];
    asciiDisplay.push(newRow);
    for(var x = 0; x < COLS; x++){
      newRow.push(initCell('', x, y));
    }
  }

  drawMap();
}

function onKeyUp(event){
  switch(event.keyCode){
    case Phaser.Keyboard.LEFT:

    case Phaser.Keyboard.RIGHT:

    case Phaser.Keyboard.UP:

    case Phaser.Keyboard.DOWN:

  }
}

// MAP DRAWING
function drawMap(){
  for(var y = 0; y < ROWS; y++){
    for(var x = 0; x < COLS; x++){
      asciiDisplay[y][x].text = map[y][x] ? '.' : '#';
    }
  }
}

function initCell(chr, x, y){
  var style = {font: FONT + "px monospace", fill: "red"};
  return game.add.text(FONT * 0.6 * x, FONT * y, chr, style);
}
