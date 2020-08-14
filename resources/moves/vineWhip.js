{
  const vineWhipData = {
    id: "vineWhip",
    name: "vine whip",
    power: 45,
    type: TYPE_GRASS,
    attackingStat: "attack",
    defendingStat: "defense",
    attackerStatMods: [],
    defendingStatMods: []
  }
  // let vineWhip = new Move(vineWhipData.id,vineWhipData.name,vineWhipData.power, vineWhipData.type, vineWhipData.attackingStat, vineWhipData.defendingStat, vineWhipData.attackerStatMods, vineWhipData.defendingStatMods);
  // MOVES.set("vineWhip", vineWhip);
  resourceLoader.add(MOVES,Move,vineWhipData);
}
