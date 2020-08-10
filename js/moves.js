class Move{
  constructor(damage,type,attackingStat,defendingStat,attackerStatMods,defendingStatMods){
    this.power = damage;
    this.type = type;

    this.attackingStat = attackingStat;
    this.defendingStat = defendingStat;

    this.attackerStatMods = attackerStatMods;
    this.defendingStatMods = defendingStatMods;
  }
}
