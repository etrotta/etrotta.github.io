{
  const rattata = {
    name:"Rattata",
    baseStats:{
      health:100,
      attack:10,
      defense:10,
      special_attack:10,
      special_defense:10,
      speed:10
    },
    levelMoves:{
      1:"tackle"
    },
    types:[
      TYPE_NORMAL
    ]
  }
  POKEMONS.set("rattata", rattata);
  // resourceLoader.add(POKEMONS,Pokemon,rattata);
}
