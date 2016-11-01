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
var actorMap;
var player;
var livingEnemies;

// initialize phaser and call create() after
var game = new Phaser.Game(COLS * FONT * 0.6, ROWS * FONT, Phaser.Auto, null, {create: create});

function create() {
  // init keyboard
  game.input.keyboard.addCallbacks(null, null, onKeyUp);

  map = mapGen.default.generateMap(ROWS, COLS);
  [actorMap, actorList] = actorGen.default.generateActors(map);


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
  setupActors();

}

function onKeyUp(event){
  drawMap();

  var acted = false;
  switch(event.keyCode){
    case Phaser.Keyboard.LEFT:
      acted = move(player, {x: -1, y: 0});
      break;

    case Phaser.Keyboard.RIGHT:
      acted = move(player,{x: 1, y: 0});
      break;

    case Phaser.Keyboard.UP:
      acted = move(player, {x: 0, y: -1});
      break;

    case Phaser.Keyboard.DOWN:
      acted = move(player, {x: 0, y: 1});
      break;

  }

  drawPlayer();
  drawActors();
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

function setupActors(){
  player = actorList[0];
  livingEnemies = actorList.length - 1;
  drawPlayer();
  drawActors();
}

function drawPlayer(){
  if(player.hp > 0){

    asciiDisplay[player.x][player.y].text = '' + player.hp;
    asciiDisplay[player.x][player.y].style.fill = '#ffffff';
  }
}

function drawActors(){
  let count = 0;
  actorList.forEach((actor) => {
    count++;

    if(actor && actor.hp > 0 && count > 1){
      asciiDisplay[actor.x][actor.y].text = 'x';
      asciiDisplay[actor.x][actor.y].style.fill = '#951209';
    }

  });
}

function initCell(chr, x, y){
  var style = {font: FONT + "px monospace"};
  return game.add.text(FONT * 0.6 * x, FONT * y, chr, style);
}

function canGo(actor, direction){
  const potentialX = actor.x + direction.x;
  const potentialY = actor.y + direction.y;

  return potentialX >= 0 && potentialX <= COLS - 1
            && potentialY >= 0 && potentialY <= ROWS - 1
            && !map[potentialX][potentialY];
}

function move(actor, direction){
  const newX = actor.x + direction.x;
  const newY = actor.y + direction.y;
  if(!canGo(actor, direction)){
    return false;
  }

  const newKey = newX + '_' + newY;
  // if there isn't actor in the spot
  if(actorMap[newKey] != null){

    var victim = actorMap[newKey];
    victim.hp--;

    if(victim.hp === 0){
      actorMap[newKey] = null;
      actorList[actorList.indexOf(victim)] = null;
      if(victim != player){
        livingEnemies--;
        if(livingEnemies === 0){
          var victory = game.add.text(game.world.centerX, game.world.centerY, 'Victory!\nCtrl+r to restart', { fill : '#2e2', align: "center" } );
          victory.anchor.setTo(0.5, 0.5);
        }
      }
    }
  } else {
    actorMap[actor.x + '_' + actor.y] = null;
    actor.y = newY;
    actor.x = newX;

    actorMap[actor.x + '_' + actor.y] = actor;
  }

  return true;
}
