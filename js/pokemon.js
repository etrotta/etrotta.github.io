class Pokemon{
  constructor(id,level,moves,x,y){
    this.id = id;
    this.data = POKEMONS.get(id); //the pokemon data are global variables currently
    this.types = this.data.types.slice(0);
    this.x = x;
    this.y = y;
    this.range = 100;
    this.level = level;
    this.experience = 0;
    this.stats = new Stats(this.data.baseStats, level);
    this.health = this.stats.health.getValue();
    this.attacks = [];
    this.attackTicks = [32,32,32,32];
    this.changedAttackTicks = 10;
    this.moves = moves;
    this.__selectedMove = 0;
  }
  get selectedMove(){
    return this.__selectedMove;
  }
  set selectedMove(value){
    if (0 <= value && value < this.moves.length && value != this.__selectedMove) {
      this.__selectedMove = value;
      this.changedAttackTicks = 0;
      drawAll();
    }
  }
  __update(level){
    let ticks = this.attackTicks;
    if (this.moves[this.selectedMove] != null && (this.shouldAttack == null || this.shouldAttack == true)){
      for (let i = ticks.length; i >= 0; i--) (ticks[i]++);
      if (ticks[this.selectedMove] >= 32 && this.changedAttackTicks >= 10){
        let target = this.getEnemyInRange(level);
        if (target != null) {
          this.attack(target,this.moves[this.selectedMove]);
          ticks[this.selectedMove] = 0;
        }
      }
      for (let i = ticks.length; i >= 0; i--) (ticks[i] = Math.clamp(ticks[i],0,32));
      for (let attack of this.attacks){
        attack.update();
      }
    }
    if (this.changedAttackTicks < 10) this.changedAttackTicks++;
  }
  __draw(x = this.x, y = this.y, hp = true){
    const color = this.types[0].color;
    if (outOfBounds(x,y)) return;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,10,0,Math.PI*2);
    ctx.fill();
    if (hp) this.displayHealth(x,y);
    this.displayLevel(x,y-24);
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
    ctx.font = "12px arial";
    ctx.fillStyle = "rgb(205, 99, 22)";
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
    ctx.fillText(`Lv:${this.level}`,x,y);
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
  moveTo(x,y, offsetX = 0, offsetY = 0){
    this.x = x + offsetX;
    this.y = y + offsetY;
    if (this.hitbox != null){
      this.hitbox.rect.x = x;
      this.hitbox.rect.y = y;
    }
  }
  attack(other, move){
    let modifiers = [];
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
  heal(value = this.stats.get("health").getValue()){
    this.health = Math.clamp(0, this.health + value, this.stats.get("health").getValue());
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

    const self = this;
    this.hitbox = new Dropable(
      {x: -1, y:-1, width:32, height:32, draw:self,color:"blue"},
      null,
      {pokemon:self}
    );
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
      let x = Math.clamp(point.x, this.x - 1, this.x + 1 );
      let y = Math.clamp(point.y, this.y - 1, this.y + 1 );
      this.moveTo(x - 16, y - 16, 16, 16); //shhhhhh
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
  getDistanceToPathEnd(){
    let startingPoint = this.path.getPoint(this.targetPoint,true);
    let d = Math.abs(startingPoint.x - this.x) + Math.abs(startingPoint.y - this.y);
    let lastX = startingPoint.x;
    let lastY = startingPoint.y;
    for (let point of this.path.points.slice(this.targetPoint)){
      d += Math.abs(point.x - lastX) + Math.abs(point.y - lastY);
      lastX = point.x;
      lastY = point.y;
    }
    return d;
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
    this.slot = null;
    const self = this;
    this.hitbox = new Dragable(
      {x: -1, y:-1, width:32, height:32, draw:self, drawArgs:[false,true]},
      null,
      {pokemon:self, selectable:self},
      function(){paused = true;},
      function(dropable){paused = false; if (dropable == null){ self.setSpot(null); } else if (dropable.packet.spot instanceof Spot){ self.setSpot(dropable.packet.spot); } },
      function(){self.drawRange();}
    );
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
  }
  draw(x = this.x, y = this.y, hp = true, range = false, exp = false, moves = false){
    this.__draw(...arguments);
    if (range) this.drawRange(x,y);
    if (exp) this.displayExpOnSlot(x,y + 40);
    if (moves) this.displayMovesOnSlot(x,y + 40);
  }
  drawRange(x = this.x, y = this.y,color = "rgba(0,63,127,0.5)"){
    if (drewThisTick.indexOf("range") != -1) return; drewThisTick.push("range");
    if (outOfBounds(x,y) || this.health <= 0) return;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,this.range,0,Math.PI*2);
    ctx.fill();
  }
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
  displayMovesOnSlot(x,y){
    for (let i = 0; i < this.moves.length; i++){
      this.displayMoveOnSlot(x,y,i);
    }
  }
  displayMoveOnSlot(x,y,i){
    if (this.moves[0] == null) return;
    const width = 90;
    const height = 24;
    const offsetY = 24 * i;
    const move = this.moves[i];
    const key = ["Z","X","C","V"][i];
    const moveProgress = this.attackTicks[i] / 32;
    const changeProgress = this.changedAttackTicks / 10;

    ctx.lineWidth = 2;
    ctx.strokeStyle = "white";
    ctx.strokeRect(x - width/2-1, y + offsetY-1, width+1, height+1);
    if (i === this.selectedMove){
      ctx.fillStyle = "rgba(63,63,180,0.5)";
      ctx.fillRect(x - width/2+1, y + offsetY+1, width-1, height-1);
    }

    ctx.fillStyle = "rgba(0,0,0,0.3)";
    ctx.fillRect(x - width/2, y + offsetY, width * (1-moveProgress), height);
    ctx.fillRect(x - width/2, y + offsetY, width * (1-changeProgress), height);

    ctx.fillStyle = move.type.color;
    ctx.lineWidth = 1;
    ctx.font = "12px arial";
    ctx.textAlign = "left";
    ctx.textBaseline = "bottom";
    ctx.fillText(this.moves[i].name, x - width/2 + 2, y + height/2 + offsetY + 1);
    if (LAST_SELECTED == this){
      ctx.textAlign = "right";
      ctx.fillText(`(${key})`, x + width/2 - 2, y + height/2 + offsetY + 1);
    }
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
      this.moveTo(-1,-1);
    }
    else {
      this.setActive(true);
      spot.pokemon = this;
      this.moveTo(spot.x, spot.y, spot.width / 2, spot.height / 2);
    }
    if (other != null){
      other.spot = oldSpot;
      if (oldSpot != null){
        oldSpot.pokemon = other;
        other.setActive(true);
        other.moveTo(oldSpot.x, oldSpot.y, oldSpot.width/2, oldSpot.height/2);
      }
      else {
        other.setActive(false);
        other.moveTo(-1,-1);
      }
      other.draw();
    }
    if (other == null && oldSpot != null){
      oldSpot.pokemon = null;
    }
    this.draw();
  }
  faint(){
    this.setSpot(null);
    // this.setActive(false);
    // this.spot.pokemon = null;
    // this.spot = null;
  }
  getEnemyInRange(level){
    // FILTERING BY CLOSEST TO PATH END
    let poke = null;
    let distance = Infinity;
    for (let pokemon of level.wildPokes){
      if (getDistance(this,pokemon) < this.range){
        let dis = pokemon.getDistanceToPathEnd();
        if (dis < distance){
          distance = dis;
          poke = pokemon;
        }
      }
    }
    return poke;
  }
  save(){
    let data = {};
    data.id = this.id;
    data.level = this.level;
    data.experience = this.experience;
    data.moves = []; for (let move of this.moves) data.moves.push(move.id);
    return JSON.stringify(data);
  }
  static load(data){ // Load FROM RESOURCE, not from save data*
    if (data.id == null) return;
    let moves = []; for (let move of data.moves){ moves.push(MOVES.get(move)); }
    let poke = new Ally(data.id,parseInt(data.level),moves);
    poke.experience = parseInt(data.experience);
    return poke;
  }
}
