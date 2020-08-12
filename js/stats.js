class Stat{
  constructor(id,value){
    this.id = id;
    this.value = value;
    this.stage = 0;
  }
  getValue(){
    const multi = this.stage >= 0 ? (2+this.stage) / 2 : 2 / (2 - this.stage);
    return this.value * multi;
  }
  buff(stages = 1){
    this.stage += stages / 2;
    this.stage = Math.clamp(this.stage,-6,6);
  }
}

class Stats{
  constructor(stats, level){
    this.baseStats = stats;
    this.update(level);
  }
  reset(){
    this.health.stage = 0;
    this.attack.stage = 0;
    this.defense.stage = 0
    this.special_attack.stage = 0;
    this.special_defense.stage = 0;
    this.speed.stage = 0;
  }
  update(level){
    let stats = this.baseStats;
    this.health = new Stat("health",Math.ceil((stats.health+110) * level / 50));
    this.attack = new Stat("attack",Math.ceil((stats.attack+5) * level / 50));
    this.defense = new Stat("defense",Math.ceil((stats.defense+5) * level / 50));
    this.special_attack = new Stat("special_attack",Math.ceil((stats.special_attack+5) * level / 50));
    this.special_defense = new Stat("special_defense",Math.ceil((stats.special_defense+5) * level / 50));
    this.speed = new Stat("speed",Math.ceil((stats.speed+5) * level / 50));
  }
  get(stat){
    if (this[stat] != null) return this[stat]; else return null;
  }

}
