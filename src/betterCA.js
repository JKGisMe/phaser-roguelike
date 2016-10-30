export default {
  initialWallChance: 0.4,
  map: [],
  rows: 10,
  cols: 25,
  repetitions: 7,
  wallConversionThreshhold: 5,


  generateMap(rows, cols){
    this.rows = rows;
    this.cols = cols;
    this.initMap();
    this.processMap();

    return this.map;
  },

  initMap(){
    let newCol;
    for(let x = 0; x < this.cols; x++){
      newCol = [];
      for(let y = 0; y < this.rows; y++){

        // walls are true
        newCol.push(Math.random() <= this.initialWallChance);
      }
      this.map.push(newCol);
    }
  },

  processMap(){
    let isLastRep = false;
    for(let i = 0; i < this.repetitions; i++){
      isLastRep = (i >= (this.repetitions - 3));

      this.evaluateMap(isLastRep);
    }
  },

  evaluateMap(isLastRep){
    let newMap = [];
    let newCol;
    let score;

    for(let x = 0, y = 0; x < this.cols; x++){
      newCol = [];

      for(y = 0; y < this.rows; y++){
        score = this.checkSpot(x, y);
        if(x === this.cols - 1 || y === this.rows - 1 || x === 0 || y === 0){
          newCol.push(true);
        } else if(score >= this.wallConversionThreshhold || (!isLastRep && score <= 1)){
          newCol.push(true);
        } else {
          newCol.push(false);
        }
      }
      newMap.push(newCol);
    }
    this.map = newMap;
  },

  checkSpot(x, y){
    const dirs = [-1, 0, 1];
    let wallCount = 0;
    let neighboringX;
    let neighboringY;

    dirs.forEach((xDir) => {
      dirs.forEach((yDir) => {
        neighboringX = x + xDir;
        neighboringY = y + yDir;

        if(neighboringX === x && neighboringY === y){
          // this is the spot, not a neighbor
        } else if(neighboringX >= this.map.length || neighboringY >= this.map[0].length || neighboringX < 0 || neighboringY < 0){
          wallCount++;
        } else if(this.map[neighboringX][neighboringY]){
          wallCount++;
        }
      });
    });

    return wallCount;
  }


}
