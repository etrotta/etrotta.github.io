{
  const tackleData = {
    id: "tackle",
    name: "tackle",
    power: 40,
    type: TYPE_NORMAL,
    attackingStat: "attack",
    defendingStat: "defense",
    attackerStatMods: [],
    defendingStatMods: []
  }
  // let tackle = new Move(tackleData.id,tackleData.name,tackleData.power, tackleData.type, tackleData.attackingStat, tackleData.defendingStat, tackleData.attackerStatMods, tackleData.defendingStatMods);
  // MOVES.set("tackle", tackle);
  resourceLoader.add(MOVES,Move,tackleData);
}
