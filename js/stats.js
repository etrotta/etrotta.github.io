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
  constructor(health,attack,defense,special_attack,special_defense,speed){
    this.health = new Stat("health",health);
    this.attack = new Stat("attack",attack);
    this.defense = new Stat("defense",defense);
    this.special_attack = new Stat("special_attack",special_attack);
    this.special_defense = new Stat("special_defense",special_defense);
    this.speed = new Stat("speed",speed);
  }
  reset(){
    this.health.stage = 0;
    this.attack.stage = 0;
    this.defense.stage = 0
    this.special_attack.stage = 0;
    this.special_defense.stage = 0;
    this.speed.stage = 0;
  }
  static generateFrom(stats, level){
    const hp = stats.health * level / 50 + 110;
    const atk = stats.attack * level / 50 + 5;
    const def = stats.defense * level / 50 + 5;
    const sp_atk = stats.special_attack * level / 50 + 5;
    const sp_def = stats.special_defense * level / 50 + 5;
    const speed = stats.speed * level / 50 + 5;
    return new Stats(hp,atk,def,sp_atk,sp_def,speed);
  }
}
