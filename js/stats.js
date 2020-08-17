class Stat{
  constructor(id,value,color){
    this.id = id;
    this.value = value;
    this.stage = 0;
    this.display = new Display(
      {x:0, y:0, width:16, height:16, color:color, outline:{thickness:1,color:"black"}},
      {text:"",color:"white",size:10, offsetX:"center",offsetY:"middle", startXAt:6},
      true,
      false
    )
  }
  getValue(){
    const multi = this.stage >= 0 ? (2+this.stage) / 2 : 2 / (2 - this.stage);
    return this.value * multi;
  }
  getMulti(){
    return this.stage >= 0 ? (2+this.stage) / 2 : 2 / (2 - this.stage);
  }
  buff(stages = 1){
    this.stage += stages;
    this.stage = Math.clamp(this.stage,-6,6);
  }
}

class Stats{
  constructor(stats, level){
    this.baseStats = stats;
    this.health = new Stat("health",Math.ceil((stats.health+110) * level / 50));
    this.attack = new Stat("attack",Math.ceil((stats.attack+5) * level / 50),"red");
    this.defense = new Stat("defense",Math.ceil((stats.defense+5) * level / 50),"blue");
    this.special_attack = new Stat("special_attack",Math.ceil((stats.special_attack+5) * level / 50),"fuchsia");
    this.special_defense = new Stat("special_defense",Math.ceil((stats.special_defense+5) * level / 50),"rgb(0,200,200)");
    this.speed = new Stat("speed",Math.ceil((stats.speed+5) * level / 50),"green");

    this.stats = [this.health,this.attack,this.defense,this.special_attack,this.special_defense,this.speed];
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
    const stats = this.baseStats;
    this.health.value = Math.ceil((stats.health+110) * level / 50);
    this.attack.value = Math.ceil((stats.attack+5) * level / 50);
    this.defense.value = Math.ceil((stats.defense+5) * level / 50);
    this.special_attack.value = Math.ceil((stats.special_attack+5) * level / 50);
    this.special_defense.value = Math.ceil((stats.special_defense+5) * level / 50);
    this.speed.value = Math.ceil((stats.speed+5) * level / 50);
  }
  get(stat){
    if (this[stat] != null) return this[stat]; else return null;
  }
  apply(changes){
    for (let change of changes){
      this[change.id].buff(change.value);
    }
  }
}
