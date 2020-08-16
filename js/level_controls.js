LAST_SELECTED = null;

function levelHandleKey(key,value){
  if (Instance.activeLevel == null) return;
  if (LAST_SELECTED instanceof Ally){
    if (key === "z") { LAST_SELECTED.selectedMove = 0; }
    else if (key === "x") { LAST_SELECTED.selectedMove = 1; }
    else if (key === "c") { LAST_SELECTED.selectedMove = 2; }
    else if (key === "v") { LAST_SELECTED.selectedMove = 3; }
  }
  if (key === "p" && value){
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
  // console.log(key);
}
