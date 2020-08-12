class Pokemon{
  constructor(id,level,moves,x,y){
    this.id = id;
    this.data = window[id]; //the pokemon data are global variables currently
    this.types = this.data.types.slice(0);
    this.x = x;
    this.y = y;
    this.range = 100;
    this.level = level;
    this.experience = 0;
    this.stats = new Stats(this.data.baseStats, level);
    this.health = this.stats.health.getValue();
    this.attacks = [];
    this.attackTicks = 0;
    this.moves = moves;
    this.__selectedMove = 0;
  }
  get selectedMove(){
    return this.__selectedMove;
  }
  set selectedMove(value){
    if (0 <= value && value < this.moves.length) this.__selectedMove = value;
  }
  __update(level){
    if (this.moves[this.selectedMove] != null && (this.shouldAttack == null || this.shouldAttack == true)){
      this.attackTicks++;
      if (this.attackTicks >= 20){
        let target = this.getEnemyInRange(level);
        if (target != null) {
          this.attack(target,this.moves[this.selectedMove]);
          this.attackTicks = 0;
        }
      }
      for (let attack of this.attacks){
        attack.update();
      }
    }
  }
  __draw(x = this.x, y = this.y,color = this.types[0].color){
    if (outOfBounds(x,y)) return;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,10,0,Math.PI*2);
    ctx.fill();
    this.displayHealth(x,y);
    this.displayLevel(x-10,y-24);
    for (let attack of this.attacks){
      attack.draw();
    }
  }
  displayHealth(x,y){
    const ratio = this.health / this.stats.health.getValue();
    const size = 32 * ratio;
    ctx.lineWidth = 2;
    ctx.strokeStyle = "white";
    ctx.strokeRect(x - size/2-1, y - 20-1, size+1, 6+1);
    if (this.isBoss) ctx.fillStyle = "rgba(0,0,255,0.6)"; else
    if (ratio > 0.4){
      ctx.fillStyle = "rgba(0,255,0,0.6)";
    }
    else {
      ctx.fillStyle = "rgba(255,0,0,0.6)";
    }
    ctx.fillRect(x - size/2, y - 20, size, 6);
  }
  displayLevel(x,y){
    ctx.lineWidth = 1;
    ctx.font = "10px arial";
    ctx.strokeStyle = "rgb(205, 99, 22)";
    ctx.strokeText(`Lv:${this.level}`,x,y);
  }
  addExp(exp){
    if (this.level === LEVEL_CAP){
      return;
    }
    const expToLevel = expLevelFormula(this.level);
    this.experience += exp;
    if (this.experience >= expToLevel){
      this.experience -= expToLevel;
      this.levelUp();
      this.addExp(0); //just to run again
    }
  }
  levelUp(){
    if (this.level === LEVEL_CAP) return;
    this.level++;
    this.checkEvolution();
    this.stats.update(this.level);
    this.health = this.stats.get("health").getValue();
    if (this.level === LEVEL_CAP) this.experience = 0;
  }
  checkEvolution(){
    return null; //not implementated yet
  }
  moveTo(x,y){
    this.x = x;
    this.y = y;
  }
  attack(other, move){
    let modifiers = [];
    // let resolve = other.damage;
    // let vars = damageFormula(this,other,move,modifiers);
    let self = this;
    let resolve = function(){if (other != null && other.health > 0) other.damage(damageFormula(self,other,move,modifiers));};
    this.attacks.push( new Attack(move, this, other, resolve, move.type.color) );
  }
  damage(value){
    this.health -= value;
    if (this.health <= 0){
      this.health = 0;
      this.__faint();
      this.faint();
    }
  }
  __faint(){
    for (let attack of this.attacks){
      attack.destroy();
    }
  }
}




class Enemy extends Pokemon{
  constructor(id,level,path,moves = [],shouldAttack = false,isBoss = false){
    super(id, level, moves, path.start.x, path.start.y);
    this.path = path;
    this.targetPoint = 0;
    this.shouldAttack = shouldAttack;
    this.isBoss = isBoss;
  }
  update(level){
    let point;
    let safety = 0;
    do {
      point = this.path.getPoint(this.targetPoint,true);
      if (this.x == point.x && this.y == point.y) this.targetPoint++;
      safety++;
      if (safety > 100) {throw new Error("Too much looping!"); break;}
      // console.log("Walking");
    } while ((this.path.loop || point != this.path.end) && this.x == point.x && this.y == point.y);
    if (!this.path.loop && point == this.path.end && this.x == point.x && this.y == point.y){
      // console.log("Path end");
      // this.draw();
      // return;
    } else {
      let x = Math.clamp(point.x, this.x - 2, this.x + 2 );
      let y = Math.clamp(point.y, this.y - 2, this.y + 2 );
      this.moveTo(x,y);
    }
    // this.draw();
    this.__update(level);
  }
  draw(x = this.x, y = this.y){
    this.__draw(...arguments);
  }
  faint(){
    Instance.activeLevel.party.addExp(expGainFormula(this));
    Instance.activeLevel.wildPokes.remove(this);
  }
  getEnemyInRange(level){
    for (let slot of level.party.slots){
      if (slot.pokemon == null || !slot.pokemon.active) continue;
      if (getDistance(slot.pokemon,this) < this.range){
        return slot.pokemon;
      }
    }
  }
  canCatch(){
    if (this.health / this.stats.health.getValue() > 0.4 || this.isBoss) return false;
    return true;
  }
}




class Ally extends Pokemon{
  constructor (id,level,moves){
    super(id,level,moves,-1,-1);
    this.active = false;
    this.spot = null;
  }
  setActive(value){
    if (this.health <= 0 && value == 1) return;
    this.active = value;
    if (value == false){
      for (let attack of this.attacks){
        attack.destroy();
      }
    }
  }
  update(level){
    if (!this.active) return;
    this.__update(level);
    // this.draw();
  }
  draw(x = this.x, y = this.y, color = this.color){
    this.__draw(...arguments);
  }
  drawRange(x = this.x, y = this.y,color = "rgba(0,63,127,0.5)"){
    if (outOfBounds(x,y)) return;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,this.range,0,Math.PI*2);
    ctx.fill();
  }
  // displayHealthOnSlot(x,y){ //not being using
  //   const ratio = this.health / this.stats.health.getValue();
  //   const size = 32;
  //   ctx.fillStyle = "rgba(0,255,0,0.6)";
  //   ctx.fillRect(x - size/2, y - 24, size * ratio, 6);
  //   ctx.fillStyle = "rgba(255,255,255,0.6)";
  //   ctx.fillRect(x + size/2 - (size * (1 - ratio)), y - 24, 32 * (1 - ratio), 6);
  // }
  displayExpOnSlot(x,y){
    const ratio = this.experience / expLevelFormula(this.level);
    const width = 32;
    const height = 6;
    const offsetY = 24;
    ctx.lineWidth = 2;
    ctx.strokeStyle = "white";
    ctx.strokeRect(x - width/2-1, y - offsetY-1, width+1, height+1);
    ctx.fillStyle = "rgba(0,0,255,0.6)";
    ctx.fillRect(x - width/2, y - offsetY, width * ratio, height);
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.fillRect(x + width/2 - (width * (1 - ratio)), y - offsetY, width * (1 - ratio), height);
  }
  displayMoveOnSlot(x,y,i){
    if (this.moves[0] == null) return;
    const width = 64;
    const height = 16;
    const offsetY = 20 * i;
    const move = this.moves[i];
    ctx.lineWidth = 2;
    ctx.strokeStyle = "white";
    ctx.strokeRect(x - width/2-1, y - height + offsetY-1, width+1, height+1);
    if (i === this.selectedMove){
      ctx.fillStyle = "rgba(63,63,180,0.5)";
      ctx.fillRect(x - width/2+1, y - height + offsetY+1, width-1, height-1);
    }
    ctx.fillStyle = move.type.color;
    ctx.lineWidth = 1;
    ctx.font = "12px arial";
    ctx.fillText(this.moves[i].id, x - width/2 + 1, y - height/2 + offsetY + 1);
  }
  setSpot(spot){
    if (this.spot == spot) return;
    if (this.health <= 0 && spot != null) return;
    const oldSpot = this.spot;
    this.spot = spot;
    let other = null;
    if (spot != null){
      other = spot.pokemon;
    }
    if (spot == null){
      this.setActive(false);
      this.x = -1;
      this.y = -1;
    }
    else {
      this.setActive(true);
      spot.pokemon = this;
      this.x = spot.x + spot.width/2;
      this.y = spot.y + spot.height/2;
    }
    if (other != null){
      other.spot = oldSpot;
      if (oldSpot != null){
        oldSpot.pokemon = other;
        other.setActive(true);
        other.x = oldSpot.x + oldSpot.width/2;
        other.y = oldSpot.y + oldSpot.height/2;
      }
      else {
        other.setActive(false);
        other.x = -1;
        other.y = -1;
      }
      // other.update();
      other.draw();
    }
    if (other == null && oldSpot != null){
      oldSpot.pokemon = null;
    }
    // this.update();
    this.draw();
  }
  faint(){
    // this.setSpot(null);
    this.setActive(false);
    this.spot.pokemon = null;
    this.spot = null;
  }
  getEnemyInRange(level){
    for (let pokemon of level.wildPokes){
      if (getDistance(this,pokemon) < this.range){
        return pokemon;
      }
    }
  }
}
