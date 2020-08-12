mousePos = {x:null,y:null}
clickables = [];

function getClickables(x,y){
  let ar = [];
  for (clickable of clickables){
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
  levelHandleMouse(x,y,value);
  for (clickable of getClickables(x,y)) clickable.onClick(value);
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
  levelHandleMouseMove(x,y);
}
function handleKey(evt,value){
  levelHandleKey(evt.keyCode,value);
  if (evt.keyCode === 32){
    evt.preventDefault();
  }
  // 32 : Spacebar
  // console.log(evt.keyCode);
}
function handleContext(evt){
  if (evt.target === canvas) evt.preventDefault();
}
