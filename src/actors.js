export default {
  actors: 6,

  map: [],
  actorList: [],
  actorMap: {},

  generateActors(map){
    this.map = map;
    this.initActors();

    return [this.actorMap, this.actorList];
  },

  initActors(){
    for(let i = 0; i < this.actors; i++){
      let actor = {x: 0,
                   y: 0,
                   hp: i === 0 ? 3 : 1};
      while(this.map[actor.x][actor.y] || this.actorMap[actor.x + "_" + actor.y] != null){
        actor.x = this.randomNum(this.map.length);
        actor.y = this.randomNum(this.map[0].length);
      }
      this.actorMap[actor.x + "_" + actor.y] = actor;
      this.actorList.push(actor);
    }

    // player = this.actorList[0];
    // livingEnemies = this.actors - 1;


  },

  randomNum(max){
    return Math.floor(Math.random() * max);
  }


}
