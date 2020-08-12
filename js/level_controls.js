SELECTED = null;
LAST_SELECTED = null;

function getSlot(x,y,level){
  for (slot of level.party.slots){
    if (slot.x < x && x < (slot.x + slot.width) && slot.y < y && y < (slot.y + slot.height)) return slot;
  }
  return null;
}
function getSlotPokemon(x,y,level){ const slot = getSlot(x,y,level); if (slot == null) return null; else return slot.pokemon; }

function getSpot(x,y,level){
  for (spot of level.spots){
    if (spot.x < x && x < spot.x + spot.width && spot.y < y && y < spot.y + spot.height) return spot;
  }
  return null;
}
function getSpotPokemon(x,y,level){ const spot = getSpot(x,y,level); if (spot == null) return null; else return spot.pokemon; }

function getPokeball(x,y){
  const r = pokeball.radius;
  if (pokeball.x - r < x && x < pokeball.x + r && pokeball.y - r < y && y < pokeball.y + r) return pokeball; else return null;
}

// 1 = UP, 0 = DOWN
function levelHandleMouse(x,y,value){
  const level = Instance.activeLevel;
  if (level == null) return;
  if (value === 0) {
    SELECTED = getSlotPokemon(x,y,level) || getSpotPokemon(x,y,level) || getPokeball(x,y);
    if (SELECTED != null) paused = true;
    if (isPokemon(SELECTED)) LAST_SELECTED = SELECTED;
  }
  if (value === 1){
    paused = false;
    if (isPokemon(SELECTED)) {
      SELECTED.setSpot(getSpot(x,y,level));
      SELECTED = null;
    }
    else if (SELECTED instanceof Pokeball){
      const pokemon = getPokemonInBounds(x,y,50,50,p => p instanceof Enemy);
      if (pokemon != null) party.tryCatch(pokemon);
      SELECTED = null;
    }
  }
}
function levelHandleMouseMove(x,y){
  if (Instance.activeLevel == null) return;
  drawAll();
  if (SELECTED != null && SELECTED.drawRange != null) {
    SELECTED.drawRange(x,y);
    SELECTED.draw(x,y);
  }
  if (SELECTED instanceof Pokeball){
    SELECTED.draw(x,y,25,0.5);
  }
}
function levelHandleKey(keyCode,value){
  if (Instance.activeLevel == null) return;
  if (isPokemon(LAST_SELECTED)){
    if (keyCode === 90) { LAST_SELECTED.selectedMove = 0; }
    else if (keyCode === 88) { LAST_SELECTED.selectedMove = 1; }
    else if (keyCode === 67) { LAST_SELECTED.selectedMove = 2; }
    else if (keyCode === 86) { LAST_SELECTED.selectedMove = 3; }
  }
  if (keyCode === 80 && value){
    // P Pause
    playerPaused = !playerPaused;
  }
  // 80 : P
  /*
    Z = 90
    X = 88
    C = 67
    V = 86
  */
  // console.log(keyCode);
}
