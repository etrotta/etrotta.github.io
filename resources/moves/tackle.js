{
  const tackleData = {
    id: "tackle",
    name: "Tackle",
    power: 40,
    type: TYPE_NORMAL,
    category: "attack",
    target:"single",
    requiresTarget:true,
    attackingStat: "attack",
    defendingStat: "defense",
    attackerStatMods: [],
    defendingStatMods: []
  }
  resourceLoader.add(MOVES,Move,tackleData);
}
