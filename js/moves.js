class Move{
  constructor(data){
    this.id = data.id;
    this.name = data.name;

    this.power = data.power;
    this.type = data.type;
    this.category = data.category;
    this.target = data.target;
    this.requiresTarget = data.requiresTarget === undefined ? (data.category != "special") : data.requiresTarget;
    if (this.target == "special"){
      this.targetFunction = data.targetFunction;
    }
    this.instantaneous = data.instantaneous;

    this.attackingStat = data.attackingStat;
    this.defendingStat = data.defendingStat;

    this.attackerStatMods = data.attackerStatMods;
    this.defendingStatMods = data.defendingStatMods;
  }
  canAttack(pokemon,target){
    if (!this.requiresTarget || target != null) return true;
  }
}
