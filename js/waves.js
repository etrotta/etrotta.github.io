class Wave{
  constructor(data){
    this.pokemon = data.id;
    this.minLevel = data.minLevel;
    this.maxLevel = data.maxLevel;
    this.path = data.path;
    this.delay = data.delay;
    this.startingTicks = data.startingDelay;
    this.ticks = data.startingDelay;
    this.count = data.count;
    this.originalCount = data.count;
    this.shouldAttack = data.shouldAttack;
    this.boss = data.boss;
    this.forceEnd = data.forceEnd;
    this.onEnd = data.onEnd;
    this.pokesName = data.name;
    this.moves = [];
      for (let move of data.moves){
        if (move instanceof Move){
          this.moves.push(move);
        }
        else if (typeof(move) === "string"){
          this.moves.push(MOVES.get(move));
        }
      }
  }
  spawn(level){
    let pokemon = new Enemy(this.pokemon,random(this.minLevel,this.maxLevel),level.paths[this.path],this.moves.slice(0),this.shouldAttack,this.boss,this.name);
    pokemon.hitbox.setActive(true);
    level.wildPokes.push(pokemon);
  }
  update(level){
    this.ticks--;
    if (this.ticks <= 0){
      this.spawn(level);
      this.ticks = this.delay;
      if (this.count != -1){
        this.count--;
        if (this.count == 0){
          if (this.onEnd != null) this.onEnd();
          this.destroy(level);
          return;
        }
      }
    }
    if (this.forceEnd != null && this.forceEnd()){
      this.destroy(level);
    }
  }
  destroy(level){
    level.waves.remove(this);
  }
  clone(){
    return new Wave(this.id,this.level,this.path,this.delay,this.ticks,this.count,this.moves,this.shouldAttack,this.boss,this.forceEnd,this.onEnd);
  }
}
