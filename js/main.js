canvas = null;
ctx = null;
paused = false;

window.addEventListener("load",load);

function load(){
  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");
  ctx.lineWidth = 2;

  path = new Path(new Point(0,100), new Point(100,100), new Point(100,300), new Point(500,300));

  pokes = [];
  // pokes.push(new Enemy("bulbasaur",100,path));
  waves = [];
  //   constructor(id,level,path,delay,count,forceEnd,onEnd){
  waves.push(new Wave("bulbasaur",100,path,60,-1));
  waves[0].spawn();

  spots.push(new Spot(50,125));
  spots.push(new Spot(140,250));
  spots.push(new Spot(240,250));
  spots.push(new Spot(140,340));

  party = new Party();
  party.populateSlots(null);
  party.update();

  pokeball = new Pokeball(535,450);

  loop();
  setInterval(loop,250);

  document.addEventListener("mousedown",function(evt){handleMouse(evt,0);});
  document.addEventListener("mouseup",function(evt){handleMouse(evt,1);});
  document.addEventListener("mousemove",function(evt){handleMouseMove(evt);});
  document.addEventListener("contextmenu",function(evt){handleContext(evt);});
  document.addEventListener("keydown",function(evt){handleKey(evt,0);});
  document.addEventListener("keyup",function(evt){handleKey(evt,1);});
}

function drawAll(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "rgba(127,127,127,0.5)";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  path.draw();
  // slots.forEach(slot => slot.draw());
  party.draw();
  pokeball.draw();
  spots.forEach(spot => spot.draw());
  pokes.forEach(poke => poke.draw());
  if (SELECTED != null && SELECTED.pokemon != null) SELECTED.pokemon.draw(mousePos.x,mousePos.y);
  if (SELECTED == pokeball) SELECTED.draw(mousePos.x,mousePos.y,25,0.5);
}

function loop(){
  if (!paused) {
    waves.forEach(wave => wave.update());
    pokes.forEach(poke => poke.update());
    party.update();
  }
  drawAll();
}
