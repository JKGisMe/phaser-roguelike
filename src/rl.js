import * as mapGen from './betterCA';
import * as actorGen from './actors';

// font size (should be named font size)
var FONT = 24;

// map dimensions
var ROWS = 20; // 20
var COLS = 50; // 60

// number of actors per level including player
var ACTORS = 10;

var map;
var asciiDisplay;
var actorList;

// initialize phaser and call create() after
var game = new Phaser.Game(COLS * FONT * 0.6, ROWS * FONT, Phaser.Auto, null, {create: create});

function create() {
  // init keyboard
  game.input.keyboard.addCallbacks(null, null, onKeyUp);

  map = mapGen.default.generateMap(ROWS, COLS);
  actorList = actorGen.default.generateActors(map);


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
  drawActors();
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
      if(map[x][y]){
        asciiDisplay[x][y].text = '#';
        asciiDisplay[x][y].style.fill = '#299E2C';
      } else {
        asciiDisplay[x][y].text = '.';
        asciiDisplay[x][y].style.fill = '#103912';
      }
    }
  }
}

function drawActors(){
  actorList.forEach((actor) => {
    if(actor.hp > 0){
      asciiDisplay[actor.x][actor.y].text = 'x';
      asciiDisplay[actor.x][actor.y].style.fill = '#951209';
    }
  });
  console.log('asciiDisplay', asciiDisplay);
}

function initCell(chr, x, y){
  var style = {font: FONT + "px monospace"};
  return game.add.text(FONT * 0.6 * x, FONT * y, chr, style);
}
