class Wave{
  constructor(id,level,path,delay,count,forceEnd,onEnd){
    this.pokemon = id;
    this.level = level;
    this.path = path;
    this.delay = delay;
    this.ticks = delay;
    this.count = count;
    this.forceEnd = forceEnd;
    this.onEnd = onEnd;
  }
  spawn(){
    let pokemon = new Enemy(this.pokemon,this.level,this.path);
    pokes.push(pokemon);
  }
  update(){
    this.ticks--;
    if (this.ticks == 0){
      this.spawn();
      this.ticks = this.delay;
    }
    if (this.count != -1){
      this.count--;
      if (this.count == 0){
        if (this.onEnd != null) this.onEnd();
        this.destroy();
        return;
      }
    }
    if (this.forceEnd != null && this.forceEnd()){
      this.destroy();
    }
  }
  destroy(){
    waves.remove(this);
  }
}
