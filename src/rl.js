import * as mapGen from './betterCA';

// font size (should be named font size)
var FONT = 24;

// map dimensions
var ROWS = 20; // 20
var COLS = 50; // 60

// number of actors per level including player
var ACTORS = 10;

var map;
var asciiDisplay;

// initialize phaser and call create() after
var game = new Phaser.Game(COLS * FONT * 0.6, ROWS * FONT, Phaser.Auto, null, {create: create});

function create() {
  // init keyboard
  game.input.keyboard.addCallbacks(null, null, onKeyUp);

  map = mapGen.default.generateMap(ROWS, COLS);

  // init screen
  asciiDisplay = [];
  var newCol;
  for (var x = 0; x < COLS; x++){
    newCol = [];
    for(var y = 0; y < ROWS; y++){
      newCol.push(initCell('', x, y));
    }
    asciiDisplay.push(newCol);
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
  for(var x = 0; x < COLS; x++){
    for(var y = 0; y < ROWS; y++){
      asciiDisplay[x][y].text = map[x][y] ? '#' : '.';
    }
  }
}

function initCell(chr, x, y){
  var style = {font: FONT + "px monospace", fill: "red"};
  return game.add.text(FONT * 0.6 * x, FONT * y, chr, style);
}
