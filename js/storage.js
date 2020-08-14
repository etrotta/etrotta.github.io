// NOT IMPLEMENTED YET
class Storage{
  constructor(){
    this.pokemons = [...arguments];
  }
  save(){
    const ar = [];
    for (let pokemon of this.pokemons){
      ar.push(pokemon.save());
    }
  }
}
