let mousePos = {x:null,y:null}
let SELECTED = null;
function getSlot(x,y){
  for (slot of party.slots){
    if (slot.x < x && x < (slot.x + slot.width) && slot.y < y && y < (slot.y + slot.height)) return slot;
  }
  return null;
}
function getSpot(x,y){
  for (spot of spots){
    if (spot.x < x && x < spot.x + spot.width && spot.y < y && y < spot.y + spot.height) return spot;
  }
  return null;
}
function getPokeball(x,y){
  const r = pokeball.radius;
  if (pokeball.x - r < x && x < pokeball.x + r && pokeball.y - r < y && y < pokeball.y + r) return pokeball; else return null;
}
// 1 = UP, 0 = DOWN
function handleMouse(evt,value){
  if (evt.target == null || evt.button != 0) return;
  const rect = evt.target.getBoundingClientRect();
  if (evt.target != canvas) return;
  const x = evt.x - rect.left;
  const y = evt.y - rect.top;
  if (outOfBounds(x,y) && value === 1) return;
  mousePos.x = x;
  mousePos.y = y;
  if (value === 0) {
    paused = true;
    SELECTED = getSlot(x,y) || getSpot(x,y) || getPokeball(x,y);
  }
  if (value === 1){
    paused = false;
    if (SELECTED != null && SELECTED.pokemon != null) {
      SELECTED.pokemon.setSpot(getSpot(x,y));
      SELECTED = null;
    }
    else if (SELECTED == pokeball){
      const pokemon = getPokemonInBounds(x,y,50,50,p => p.constructor == Enemy);
      console.log(pokemon);
      if (pokemon != null) party.tryCatch(pokemon);
      SELECTED = null;
    }
  }
  evt.preventDefault();
  drawAll();
}
function handleMouseMove(evt){
  if (evt.target != canvas) return;
  const rect = evt.target.getBoundingClientRect();
  const x = evt.x - rect.left;
  const y = evt.y - rect.top;
  drawAll();
  mousePos = {x,y};
  if (SELECTED != null && SELECTED.pokemon != null) {
    SELECTED.pokemon.drawRange(x,y);
    SELECTED.pokemon.draw(x,y);
  }
  if (SELECTED == pokeball){
    SELECTED.draw(x,y,25,0.5);
  }
}
function handleKey(evt,value){
 if (evt.keyCode === 32){
    // Spacebar Clear.... better not, just call it yourself if you want. Or comment out lol. Still gonna let it game.tick anyway.
    // game.clear();
    // myPoke.attack(enemy,tackle);
    // enemy.attack(myPoke,tackle);
    evt.preventDefault();
  }
  else if (evt.keyCode === 70){
    // F Fullscreen
    // document.getElementById("gameCanvas").requestFullscreen();
    // doesn't works ; all offsets become wrong xD
  }
  else if (evt.keyCode === 82){
    // R reset
    //reset();
  }
  // 67 : C
  // 32 : Spacebar
  // 73 : I
  // 79 : O
  // 70 : F
  // 77 : M
  // 78 : N
  // 76 : L
  // 84 : T
  // 71 : G
  // 82 : R
  // 85 : U
  // console.log(evt.keyCode);
}
function handleContext(evt){
  if (evt.target === canvas) evt.preventDefault();
}
