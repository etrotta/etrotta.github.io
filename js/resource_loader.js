class ResourceLoader{
  constructor(){
    this.queue = [];
    this.levels = [];
  }
  add(map,type,args){
    this.queue.push({map:map,type:type,args:args});
  }
  load(){
    while (this.queue.length){
      let p = this.queue.pop();
      p.map.set(p.args.id, new p.type(p.args));
    }
  }
  addLevel(){
    this.levels.push(arguments);
  }
  loadLevels(){
    while (this.levels.length){
      let lvl = this.levels.shift();
        let paths = [];
          lvl[1].forEach(path => paths.push( new Path(paths,...path) ));
        let waves = [];
          lvl[2].forEach(wave => waves.push( new Wave(wave) ));
        let spots = [];
          lvl[3].forEach(spot => spots.push( new Spot(...spot) ));
        let candies = [];
          if (lvl[4] != undefined) lvl[4].forEach(candy => candies.push( new Candy(...candy) ));
      levelSelector.addLevel(new Level(lvl[0],paths,waves,spots,candies));
    }
  }
}
