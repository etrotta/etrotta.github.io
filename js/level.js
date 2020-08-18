const DEFAULT_WIN_CONDITION = function(level){
  for (let wave of level.waves){
    if (wave.count > 0) return false;
  }
  if (level.wildPokes.length > 0) return false;
  return true;
}
const DEFAULT_LOSE_CONDITION = function(level){
  let hasAlive = false;
  for (let slot of party.slots){
    if (slot.pokemon != null && slot.pokemon.health > 0) { hasAlive = true; }
  }
  if (!hasAlive) return true;
  if (level.__candies.length != 0 && level.candies.length == 0) return true;
  return false;
}

class Level{
  constructor(id,paths,waves,spots,candies = [],winCondition = DEFAULT_WIN_CONDITION, onWin = null, loseCondition = DEFAULT_LOSE_CONDITION, onLose = null){
    this.id = id;
    this.paths = paths;
    this.__waves = waves.slice(0);
    this.waves = [];
    this.spots = spots;
    this.wildPokes = [];
    this.__candies = candies;
    this.candies = [];
    this.party = partyManager.party;
    this.winCondition = winCondition;
    this.onWin = onWin;
    this.loseCondition = loseCondition;
    this.onLose = onLose;
  }
  draw(){
    const self = this;
    for (let thing of this.paths.concat(this.spots).concat(this.wildPokes)){ //Yep, monstruous.
      thing.draw();
    }
    for (let candy of this.candies){
      if (candy.pokemon == null) candy.draw();
    }
  }
  update(){
    const self = this;
    for (let thing of this.waves.concat(this.wildPokes)){
      thing.update(self);
    }
    this.party.update(self);
    if (this.winCondition(self)) this.win();
    else if (this.loseCondition(self)) this.lose();
  }
  start(){
    this.waves = this.__waves.slice(0);
    for (let wave of this.waves){
      wave.count = wave.originalCount;
      wave.ticks = wave.startingTicks;
    }
    this.candies = this.__candies.slice(0);
    for (let spot of this.spots){
      spot.hitbox.setActive(true);
    }
    Instance.activeLevel = this;
    for (let slot of this.party.slots){
      if (slot.pokemon != null) slot.pokemon.hitbox.setActive(true);
      slot.hitbox.setActive(true);
    }
    pokeball.hitbox.setActive(true);
  }
  destroy(){
    const self = this;
    Instance.activeLevel = null;
    for (let wave of this.waves){
      wave.destroy(self);
    }
    while (this.candies.length) this.candies.pop();
    while (this.wildPokes.length) this.wildPokes.pop().__faint(); //__faint just removes the attacks
    for (let slot of this.party.slots){
      if (slot.pokemon != null) slot.pokemon.setSpot(null);
    }
    for (let spot of this.spots){
      spot.hitbox.setActive(false);
    }
    for (let slot of this.party.slots){
      if (slot.pokemon != null) slot.pokemon.hitbox.setActive(false);
      slot.hitbox.setActive(false);
    }
    pokeball.hitbox.setActive(false);
    if (PRE_DRAG != null) PRE_DRAG = null;
    if (DRAGGING != null) DRAGGING = null;
  }
  win(){
    if (this.onWin != null) this.onWin();
    levelSelector.return();
    Scene.display("Victory!","blue");
  }
  lose(){
    if (this.onLose != null) this.onLose();
    levelSelector.return();
    Scene.display("Lost...","red");
  }
  getCandy(x,y){
    for (let candy of this.candies){
      if (candy.pokemon != null) continue;
      if (x - 16 < candy.x && candy.x < x + 16 && y - 16 < candy.y && candy.y < y + 16){
        return candy;
      }
    }
    return null;
  }
}
