String.prototype.count = function(char){
  let r = 0;
  for (let i = 0; i < this.length; i++){
    if (this[i] == char) r++;
  }
  return r;
}

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

const random = function(min,max,step = 1){
  let n = Math.random() * (max-min) + min;
  return (n - n%step);
}

const outOfBounds = (x,y) => x < 0 || y < 0 || x > canvas.width || y > canvas.height;

const getPokemonInBounds = function(x,y,width,height,filter){
  const ar = Instance.activeLevel.party.slots.map(s => s.pokemon).filter(o => o != null).concat(Instance.activeLevel.wildPokes);
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
  let modifier = 1; //TODO
    if (attacker.types.includes(move.type)) modifier *= 1.5;
  const damage = ((2 * level/5 + 2) * power * attack / defense / 50 + 2) * modifier;
  return damage;
}
const expLevelFormula = function(level){
  return 1 + Math.floor(0.7*level**3);
}
const expGainFormula = function(dead){
  let base;
  if (dead.stats.get("baseExp") != null) base = dead.stats.get("baseExp"); else base = 140;
  if (dead.isBoss) base *= 10;
  return Math.round(base/7 * dead.level);
}
const isPokemon = function(object){
  if (object != null && object instanceof Pokemon) return true;
}

const LEVEL_CAP = 100;
