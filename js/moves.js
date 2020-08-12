class Move{
  constructor(id,damage,type,attackingStat,defendingStat,attackerStatMods,defendingStatMods){
    this.id = id;

    this.power = damage;
    this.type = type;

    this.attackingStat = attackingStat;
    this.defendingStat = defendingStat;

    this.attackerStatMods = attackerStatMods;
    this.defendingStatMods = defendingStatMods;
  }
}
