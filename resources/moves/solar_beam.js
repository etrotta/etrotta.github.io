{
  let solarBeamFunction = function(pokemon,target,level){
    const targets = [];
    const parentAngle = Math.atan((pokemon.x - target.x) / (pokemon.y - target.y));
    for (let wild of level.wildPokes){
      const wildAngle = Math.atan((pokemon.x - wild.x) / (pokemon.y - wild.y));
      const signs = (Math.sign(pokemon.x - target.x) == Math.sign(pokemon.x - wild.x)) || (Math.sign(pokemon.y - target.y) == Math.sign(pokemon.y - wild.y));
      if (signs && wildAngle - 0.2 < parentAngle && parentAngle < wildAngle + 0.2){
        targets.push(wild);
      }
    }
    return targets;
  }
  const solarBeamData = {
    id: "solar_beam",
    name: "Solar Beam",
    power: 120,
    type: TYPE_GRASS,
    category: "special",
    target:"special",
    requiresTarget:true,
    targetFunction:solarBeamFunction,
    instantaneous:true,
    attackingStat: "special_attack",
    defendingStat: "special_defense",
    attackerStatMods: [],
    defendingStatMods: []
  }
  resourceLoader.add(MOVES,Move,solarBeamData);
}
