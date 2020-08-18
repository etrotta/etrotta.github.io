{
  const vineWhipData = {
    id: "vine_whip",
    name: "Vine Whip",
    power: 45,
    type: TYPE_GRASS,
    category: "attack",
    target:"single",
    requiresTarget:true,
    attackingStat: "attack",
    defendingStat: "defense",
    attackerStatMods: [],
    defendingStatMods: []
  }
  resourceLoader.add(MOVES,Move,vineWhipData);
}
