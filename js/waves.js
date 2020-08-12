class Wave{
  constructor(id,level,path,delay,startingDelay,count,moves,shouldAttack,boss,forceEnd,onEnd){
    this.pokemon = id;
    this.level = level;
    this.path = path;
    this.delay = delay;
    this.startingTicks = startingDelay;
    this.ticks = startingDelay;
    this.count = count;
    this.originalCount = count;
    this.shouldAttack = shouldAttack;
    this.boss = boss;
    this.forceEnd = forceEnd;
    this.onEnd = onEnd;
    this.moves = moves;
  }
  spawn(level){
    let pokemon = new Enemy(this.pokemon,this.level,this.path,this.moves.slice(0),this.shouldAttack,this.boss);
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
