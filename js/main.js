MOVES = new Map();
POKEMONS = new Map();
resourceLoader = new ResourceLoader();

Instance = {};
canvas = null;
ctx = null;
paused = false;
playerPaused = false;
storageOpen = false;

window.addEventListener("load",load);

function load(){
  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");

  party = new Party()
  party.populateSlots(null);
  party.update();

  storage = new PokeStorage();

  partyManager = new PartyManager(party, storage);

  pokeball = new Pokeball(canvas.width - 50,canvas.height - 150);

  levelSelector = new LevelSelector();

  resourceLoader.load();
  resourceLoader.loadLevels();

  partyManager.load();

  levelSelector.activate();
  levelSelector.storageButton.onClick(1);

  loop();
  setInterval(loop,1000/30);

  canvas.addEventListener("mousedown",function(evt){handleMouse(evt,0);});
  canvas.addEventListener("mouseup",function(evt){handleMouse(evt,1);});
  canvas.addEventListener("mousemove",function(evt){handleMouseMove(evt);});

  canvas.addEventListener("contextmenu",function(evt){handleContext(evt);});

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
  if (DRAGGING != null) DRAGGING.drawOnMouse(mousePos.x,mousePos.y);
  levelSelector.draw();
}

function loop(){
  if (!paused && !playerPaused) {
    if (Instance.activeLevel != null) Instance.activeLevel.update();
  }
  drawAll();
}
