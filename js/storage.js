// NOT IMPLEMENTED YET
class PokeStorage{
  constructor(){
    this.pokemons = [...arguments];
  }
  add(pokemon){
    this.pokemons.push(pokemon);
  }
  remove(pokemon){
    this.pokemons.remove(pokemon);
  }
  get size(){
    return this.pokemons.length;
  }
  reset(){
    this.pokemons = [];
  }
}
