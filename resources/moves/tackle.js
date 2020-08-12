const tackleData = {
  id: "tackle",
  power: 40,
  type: TYPE_NORMAL,
  attackingStat: "attack",
  defendingStat: "defense",
  attackerStatMods: [],
  defendingStatMods: []
}
tackle = new Move(tackleData.id,tackleData.power, tackleData.type, tackleData.attackingStat, tackleData.defendingStat, tackleData.attackerStatMods, tackleData.defendingStatMods);
