class Pokemon{
  constructor(id,level,x,y){
    this.id = id;
    this.data = window[id]; //the pokemon data are global variables currently
    this.x = x;
    this.y = y;
    this.range = 160;
    this.level = level;
    this.experience = 0;
    this.stats = Stats.generateFrom(this.data.baseStats, level);
    this.health = this.stats.health.getValue();
    this.attacks = [];
    this.attackTicks = 0;
    this.selectedMove = tackle;
  }
  __update(){
    this.attackTicks++;
    if (this.attackTicks >= 8){
      let target = this.getEnemyInRange();
      if (target != null) {
        this.attack(target,this.selectedMove);
        this.attackTicks = 0;
      }
    }
    for (let attack of this.attacks){
      attack.update();
    }
  }
  __draw(x = this.x, y = this.y,color = "green"){
    if (outOfBounds(x,y)) return;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,10,0,Math.PI*2);
    ctx.fill();
    this.displayHealth(x,y);
    for (let attack of this.attacks){
      attack.draw();
    }
  }
  // displayHealth(x,y){ //I like this one better but PTD does it the other way, which is clearer about when can you catch
  //   const ratio = this.health / this.stats.health.getValue();
  //   const size = 32;
  //   ctx.fillStyle = "rgba(0,255,0,0.4)";
  //   ctx.fillRect(x - size/2, y - 24, size * ratio, 6);
  //   ctx.fillStyle = "rgba(255,0,0,0.4)";
  //   ctx.fillRect(x + size/2 - (size * (1 - ratio)), y - 24, 32 * (1 - ratio), 6);
  // }
  displayHealth(x,y){
    const ratio = this.health / this.stats.health.getValue();
    const size = 32 * ratio;
    ctx.strokeStyle = "white";
    ctx.strokeRect(x - size/2-1, y - 24-1, size+1, 6+1);
    if (ratio > 0.4){
      ctx.fillStyle = "rgba(0,255,0,0.6)";
    }
    else {
      ctx.fillStyle = "rgba(255,0,0,0.6)";
    }
    ctx.fillRect(x - size/2, y - 24, size, 6);
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
    this.attacks.push( new Attack(move, this, other, resolve) );
  }
  damage(value){
    this.health -= value;
    if (this.health <= 0){
      this.__faint();
      this.faint();
    }
  }
  __faint(){
    console.log("dead");
    for (let attack of this.attacks){
      attack.destroy();
    }
  }
}




class Enemy extends Pokemon{
  constructor(id,level,path){
    super(id, level, path.start.x, path.start.y);
    this.path = path;
    this.targetPoint = 0;
  }
  update(){
    let point;
    do {
      point = this.path.getPoint(this.targetPoint,true);
      if (this.x == point.x && this.y == point.y) this.targetPoint++;
      // console.log("Walking");
    } while (point != path.end && this.x == point.x && this.y == point.y);
    if (point == path.end && this.x == point.x && this.y == point.y){
      // console.log("Path end");
      // this.draw();
      // return;
    } else {
      let x = Math.clamp(point.x, this.x - 5, this.x + 5 );
      let y = Math.clamp(point.y, this.y - 5, this.y + 5 );
      this.moveTo(x,y);
    }
    // this.draw();
    this.__update();
  }
  draw(x = this.x, y = this.y){
    this.__draw(...arguments);
  }
  faint(){
    pokes.remove(this);
  }
  getEnemyInRange(){
    for (let slot of party.slots){
      if (slot.pokemon == null) continue;
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
  constructor (id,level,color){
    super(id,level,-1,-1);
    this.active = false;
    this.spot = null;
    this.color = color;
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
  update(){
    if (!this.active) return;
    this.__update();
    // this.draw();
  }
  draw(x = this.x, y = this.y, color = this.color){
    this.__draw(...arguments);
  }
  drawRange(x = this.x, y = this.y,color = "rgba(0,63,127,0.5)"){
    if (outOfBounds(x,y)) return;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,this.range/2,0,Math.PI*2);
    ctx.fill();
  }
  setSpot(spot,swapped = false){
    if (this.spot == spot) return;
    let other = null;
    if (spot != null){
      other = spot.pokemon;
      spot.pokemon = this;
    }
    if (other != null && !swapped){
      other.setSpot(this.spot,true);
    }
    if (spot == null){
      this.setActive(false);
      this.spot.pokemon = null;
      this.x = -1;
      this.y = -1;
    }
    else {
      this.setActive(true);
      this.x = spot.x + spot.width/2;
      this.y = spot.y + spot.height/2;
    }
    this.spot = spot;
    this.update();
  }
  faint(){
    this.setActive(false);
    this.spot.pokemon = null;
    this.spot = null;
  }
  getEnemyInRange(){
    for (let pokemon of pokes){
      if (getDistance(this,pokemon) < this.range){
        return pokemon;
      }
    }
  }
}
