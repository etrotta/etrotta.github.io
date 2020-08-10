Math.clamp = function(number,min,max) {
  return Math.min(Math.max(number,min),max);
}

Array.prototype.remove = function(object){
  for (let i = 0; i < this.length; i++){
    if (this[i] === object){
      this.splice(i,1);
      i--;
    }
  }
  return this;
}

const outOfBounds = (x,y) => x < 0 || y < 0 || x > canvas.width || y > canvas.height;

const getPokemon = function(id){
  return window[id];
}

const getPokemonInBounds = function(x,y,width,height,filter){
  const ar = party.slots.map(s => s.pokemon).filter(o => o != null).concat(pokes);
  for (let pokemon of ar){
    if (x - width/2 < pokemon.x && pokemon.x < x + width/2 && y - height/2 < pokemon.y && pokemon.y < y + height/2 && (filter == null || filter(pokemon))){
      return pokemon;
    }
  }
}

const getDistance = function (a,b){
  if (a.x < 0 || b.x < 0 || a.y < 0 || b.y < 0){
    return Infinity;
  }
  return Math.floor(Math.sqrt((a.x-b.x)**2 + (a.y-b.y)**2));
}

// TODO: implement modifiers
const damageFormula = function(attacker, target, move, modifiers){
  if (move.customFormula != null) return move.customFormula(arguments);
  const attack = attacker.stats[move.attackingStat].getValue();
  const defense = target.stats[move.defendingStat].getValue();
  const level = attacker.level;
  const power = move.power;
  const modifier = 1; //TODO
  const damage = ((2 * level/5 + 2) * power * attack / defense / 50 + 2) * modifier;
  return damage;
}
