/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _cellularAutomata = __webpack_require__(1);

	var mapGen = _interopRequireWildcard(_cellularAutomata);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	// font size (should be named font size)
	var FONT = 32;

	// map dimensions
	var ROWS = 20;
	var COLS = 60;

	// number of actors per level including player
	var ACTORS = 10;

	var map;
	var asciiDisplay;

	// initialize phaser and call create() after
	var game = new Phaser.Game(COLS * FONT * 0.6, ROWS * FONT, Phaser.Auto, null, { create: create });

	function create() {
	  // init keyboard
	  game.input.keyboard.addCallbacks(null, null, onKeyUp);

	  map = mapGen.default.generateMap(map, ROWS, COLS);

	  // init screen
	  asciiDisplay = [];
	  var newRow;
	  for (var y = 0; y < ROWS; y++) {
	    newRow = [];
	    asciiDisplay.push(newRow);
	    for (var x = 0; x < COLS; x++) {
	      newRow.push(initCell('', x, y));
	    }
	  }

	  drawMap();
	}

	function onKeyUp(event) {
	  switch (event.keyCode) {
	    case Phaser.Keyboard.LEFT:
	      console.log('left');

	    case Phaser.Keyboard.RIGHT:

	    case Phaser.Keyboard.UP:

	    case Phaser.Keyboard.DOWN:
	      console.log('down');

	  }
	}

	// MAP DRAWING
	function drawMap() {
	  for (var y = 0; y < ROWS; y++) {
	    for (var x = 0; x < COLS; x++) {
	      asciiDisplay[y][x].text = map[y][x] ? '#' : '.';
	    }
	  }
	}

	function initCell(chr, x, y) {
	  var style = { font: FONT + "px monospace", fill: "red" };
	  return game.add.text(FONT * 0.6 * x, FONT * y, chr, style);
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  chanceToLive: 0.45,
	  birthLimit: 3,
	  deathLimit: 3,
	  map: [],
	  newMap: [],
	  rows: 0,
	  cols: 0,

	  generateMap: function generateMap(map, rows, cols) {
	    console.log('map1', map);
	    this.setVars(map, rows, cols);
	    this.initMap();
	    this.checkMap();

	    return this.newMap;
	  },
	  setVars: function setVars(map, rows, cols) {
	    console.log('map2', map);

	    // this.map = map;
	    console.log('this.map', this.map);
	    this.rows = rows;
	    this.cols = cols;
	  },


	  //  seed map
	  initMap: function initMap() {
	    this.map = [];
	    var newRow = [];

	    for (var y = 0; y < this.rows - 1; y++) {
	      newRow = [];
	      for (var x = 0; x < this.cols - 1; x++) {
	        if (Math.random() < this.chanceToLive) {
	          newRow.push(true);
	        } else {
	          newRow.push(false);
	        }
	      }
	      this.map.push(newRow);
	    }
	    console.log('this.map3', this.map);
	  },
	  checkMap: function checkMap() {
	    var map = this.map;
	    var newMap = this.newMap;
	    var newRow;

	    for (var y = 0; y < map.length; y++) {
	      newRow = [];
	      for (var x = 0; x < map[0].length; x++) {
	        var liveliness = this.countNeighbors(x, y);

	        console.info('x,y: ', x, y);
	        if (map[y][x]) {
	          newRow[x] = liveliness >= this.deathLimit;
	        } else {
	          newRow[x] = liveliness <= this.birthLimit;
	        }

	        newMap.push(newRow);
	      }
	    }
	  },
	  countNeighbors: function countNeighbors(x, y) {
	    var _this = this;

	    var count = 0;
	    var directions = [-1, 0, 1];
	    var neighboringX;
	    var neighboringY;

	    directions.forEach(function (xDir) {
	      directions.forEach(function (yDir) {
	        neighboringX = x + xDir;
	        neighboringY = y + yDir;
	        if (xDir === 0 && yDir === 0) {
	          // it's the spot we're looking at so don't increment
	        } else if (_this.isOffTheMap(neighboringX, neighboringY)) {
	          count = count + 1;
	        } else if (_this.map[neighboringX][neighboringY]) {
	          count = count + 1;
	        }
	      });
	    });
	  },
	  isOffTheMap: function isOffTheMap(x, y) {
	    return x < 0 || y < 0 || x >= this.map.length || y >= this.map[0].length;
	  }
	};

/***/ }
/******/ ]);