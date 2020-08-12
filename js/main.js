Instance = {};
// Instance.levels = [];
party = new Party()
canvas = null;
ctx = null;
paused = false;
playerPaused = false;

window.addEventListener("load",load);

function load(){
  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");

  party.populateSlots(null);
  party.update();

  pokeball = new Pokeball(canvas.width - 50,canvas.height - 150);

  level1 = LEVEL_ONE;
  level2 = LEVEL_TWO;
  // Instance.levels.push(level1,level2)
  // level1.start();
  levelSelector = new LevelSelector(level1,level2);
  levelSelector.activate();

  loop();
  setInterval(loop,100);

  document.addEventListener("mousedown",function(evt){handleMouse(evt,0);});
  document.addEventListener("mouseup",function(evt){handleMouse(evt,1);});
  document.addEventListener("mousemove",function(evt){handleMouseMove(evt);});
  document.addEventListener("contextmenu",function(evt){handleContext(evt);});
  document.addEventListener("keydown",function(evt){handleKey(evt,0);});
  document.addEventListener("keyup",function(evt){handleKey(evt,1);});
}

function drawAll(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  let grad = ctx.createRadialGradient(canvas.width/2,canvas.height/2,100,canvas.width/2,canvas.height/2,Math.min(canvas.width/2,canvas.height/2));
    grad.addColorStop(0,"rgba(150,150,150,0.5)");
    grad.addColorStop(1,"rgba(120,120,120,0.5)");
  ctx.fillStyle = grad;
  ctx.fillRect(0,0,canvas.width,canvas.height);
  if (Instance.activeLevel != null) Instance.activeLevel.draw();
  levelSelector.draw();
}

function loop(){
  if (!paused && !playerPaused) {
    if (Instance.activeLevel != null) Instance.activeLevel.update();
  }
  drawAll();
}
