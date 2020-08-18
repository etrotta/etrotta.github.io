{
  const bulbasaur = {
    id:"bulbasaur",
    name:"Bulbasaur",
    baseStats:{
      health:100,
      attack:10,
      defense:10,
      special_attack:10,
      special_defense:10,
      speed:10
    },
    levelMoves:[
      {level:1,id:"tackle"},
      {level:1,id:"vine_whip"},
      {level:6,id:"solar_beam"}
    ],
    types:[
      TYPE_GRASS,
      TYPE_POISON
    ]
  }
  POKEMONS.set("bulbasaur", bulbasaur);
  // resourceLoader.add(POKEMONS,null,bulbasaur);
}
