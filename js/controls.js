mousePos = {x:null,y:null}
DRAGGING = null;
PRE_DRAG = null;
PRE_CLICK = null;

function getClickables(x,y){
  const ar = [];
  for (let clickable of clickables.concat(dropables).concat(dragables)){
    if (clickable.active && clickable.rect.x < x && x < (clickable.rect.x + clickable.rect.width) && clickable.rect.y < y && y < (clickable.rect.y + clickable.rect.height)) ar.push(clickable);
  }
  if (Instance.popups[0] != undefined){
    const filtered = [];
    loopArray: for (let i = 0; i < ar.length; i++){ //adds a label to continue later
      const clickable = ar[i];
      for (let j = 0; j < Instance.popups.length; j++){
        const popup = Instance.popups[j];
        if (popup.elements.indexOf(clickable) != -1){
          filtered.push(clickable);
          continue loopArray;
        }
      }
    }
    return filtered;
  }
  return ar;
}


// 1 = UP, 0 = DOWN
function handleMouse(evt,value){
  if (evt.target != canvas || evt.button != 0) return;
  const rect = evt.target.getBoundingClientRect();
  const x = evt.x - rect.left;
  const y = evt.y - rect.top;
  if (outOfBounds(x,y) && value === 1) return;
  mousePos = {x,y};
  for (let clickable of getClickables(x,y)) clickable.onClick(value);
  if (DRAGGING != null && value == 1) {DRAGGING.onDrop(null);}
  if (PRE_DRAG != null && value == 1) {PRE_DRAG = null;}
  evt.preventDefault();
  drawAll();
}
function handleMouseMove(evt){
  if (evt.target != canvas) return;
  const rect = evt.target.getBoundingClientRect();
  const x = evt.x - rect.left;
  const y = evt.y - rect.top;
  const clickables =  getClickables(x,y);
  if (PRE_DRAG != null) {PRE_DRAG.startDrag();}
  if (PRE_CLICK != null && clickables.indexOf(PRE_CLICK) == -1) { PRE_CLICK = null; }
  drawAll();
  mousePos = {x,y};
  for (let clickable of clickables) clickable.onHover();
}
function handleKey(evt,value){
  levelHandleKey(evt.key,value);
  if (evt.keyCode === 32){
    evt.preventDefault();
  }
  // 32 : Spacebar
  // console.log(evt.keyCode);
}
function handleContext(evt){
  if (evt.target === canvas) evt.preventDefault();
}
