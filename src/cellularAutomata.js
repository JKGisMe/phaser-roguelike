export default {
  chanceToLive: 0.45,
  zombieThreshold: 3, // dead spot must have this many live neighbors to become a zombie
  deathLimit: 1, // live spot must have this many live neighbors or it will die
  map: [],
  newMap: [],
  rows: 0,
  cols: 0,

  generateMap(map, rows, cols){
    this.rows = rows;
    this.cols = cols;

    this.initMap();
    this.checkMap();
    // this.checkMap();


    return this.map;
  },

  //  seed map
  initMap() {
    var trueCount = 0;
    var falseCount = 0;
    this.map = [];
    var newRow = [];

    for(var y = 0; y < this.rows; y++){
      newRow = [];
      for(var x = 0; x < this.cols; x++){
        if(Math.random() < this.chanceToLive){
          newRow.push(true);
          trueCount++;
        } else {
          newRow.push(false);
          falseCount++;
        }
      }
      this.map.push(newRow);
    }
    console.info('live1: ', trueCount);
    console.info('dead1: ', falseCount);
  },

  checkMap(){
    var map = this.map;
    this.newMap = [];
    var newMap = this.newMap;
    var newRow;

    for(var y=0; y<map.length; y++){
      newRow = [];
      for(var x=0; x<map[0].length; x++){
        var liveliness = this.countNeighbors(x, y);
        // console.log('liveliness', liveliness);

        // console.info('x,y: ', x, y)
        if(map[y][x]){
          newRow.push(liveliness >= this.deathLimit);
        } else {
          newRow.push(liveliness > this.zombieThreshold);
        }
      }
      newMap.push(newRow);
    }

    this.map = this.newMap;
    // console.log('map live', this.map);
  },

  countNeighbors(x, y){
    var count = 0;
    var directions = [-1, 0, 1];
    var neighboringX;
    var neighboringY;

    directions.forEach((xDir)=>{
      directions.forEach((yDir)=>{
        neighboringX = x + xDir;
        neighboringY = y + yDir;
        if(xDir === 0 && yDir === 0){
          // it's the spot we're looking at so don't increment
        } else if(this.isOffTheMap(neighboringX, neighboringY)){
          count = count + 1;
        } else if(this.map[neighboringX][neighboringY]){
          count = count + 1;
        }
      })
    });
    return count;
  },

  isOffTheMap(x, y){
    return x < 0 || y < 0 || x >= this.map.length || y >= this.map[0].length;
  }


}
