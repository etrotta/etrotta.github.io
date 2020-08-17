class Move{
  constructor(data){
    this.id = data.id;
    this.name = data.name;

    this.power = data.power;
    this.type = data.type;
    this.category = data.category;
    this.target = data.target;

    this.attackingStat = data.attackingStat;
    this.defendingStat = data.defendingStat;

    this.attackerStatMods = data.attackerStatMods;
    this.defendingStatMods = data.defendingStatMods;
  }
}
