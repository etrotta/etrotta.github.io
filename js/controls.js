mousePos = {x:null,y:null}
clickables = [];
dragables = [];
dropables = [];
DRAGGING = null;

function getClickables(x,y){
  let ar = [];
  for (let clickable of clickables.concat(dropables).concat(dragables)){
    if (clickable.active && clickable.rect.x < x && x < (clickable.rect.x + clickable.rect.width) && clickable.rect.y < y && y < (clickable.rect.y + clickable.rect.height)) ar.push(clickable);
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
  // levelHandleMouse(x,y,value);
  for (let clickable of getClickables(x,y)) clickable.onClick(value);
  if (DRAGGING != null && value == 1) {DRAGGING.onDrop(null);}
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
  for (let clickable of getClickables(x,y)) clickable.onHover();
  // levelHandleMouseMove(x,y);
  // if (DRAGGING != null && drewThisTick.indexOf("mouse dragging selected") == -1){
    // drewThisTick.push("mouse dragging selected");
    // DRAGGING.drawOnMouse(x,y);
  // }
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
