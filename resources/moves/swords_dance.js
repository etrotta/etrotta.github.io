{
  const swordsDanceData = {
    id: "swords_dance",
    name: "Swords Dance",
    type: TYPE_NORMAL,
    category: "status",
    target:"self",
    requiresTarget:false,
    attackerStatMods: [{id:"attack", value:2}]
  }
  resourceLoader.add(MOVES,Move,swordsDanceData);
}
