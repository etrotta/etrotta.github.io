{
  const agilityData = {
    id: "agility",
    name: "Agility",
    type: TYPE_PHYCHIC,
    category: "status",
    target:"self",
    requiresTarget:false,
    attackerStatMods: [{id:"speed", value:2}]
  }
  resourceLoader.add(MOVES,Move,agilityData);
}
