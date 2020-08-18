{
  let rat_moves = ["tackle"];

  let paths = [];
  // let path1 = new Path(new Point(0,100), new Point(100,100), new Point(100,300), new Point(500,300));
  // let path2 = new Path(new Point(200,100), {path:path1, startAt:1});
  // paths.push(path1);
  // paths.push(path2);
  paths.push([new Point(0,300), new Point(200,300), new Point(400,300), new Point(600,300), new Point(600,100)]);
  paths.push([new Point(0,200), new Point(200,200), new Point(400,200),  {path:0, startAt:2}]);
  paths.push([new Point(0,100), new Point(200,100), {path:1, startAt:1}]);

  let waves = [];
  // waves.push(new Wave("rattata",10,path1,100,1,-1,rat_moves,false,false));
  // waves.push(new Wave("bulbasaur",20,path2,400,10,1,bulb_moves,true,true));
  waves.push({
    id:"rattata",
    minLevel:10,
    maxLevel:15,
    path:2,
    delay:100,
    startingDelay:20,
    count:10,
    moves:rat_moves,
    shouldAttack:false,
    boss:false
  });
  waves.push({
    id:"rattata",
    minLevel:10,
    maxLevel:15,
    path:1,
    delay:100,
    startingDelay:10,
    count:10,
    moves:rat_moves,
    shouldAttack:false,
    boss:false
  });
  waves.push({
    id:"rattata",
    minLevel:15,
    maxLevel:20,
    path:0,
    delay:200,
    startingDelay:1,
    count:5,
    moves:rat_moves,
    shouldAttack:false,
    boss:false
  });
  // waves.push(["rattata",10,15,2,100,20,10,rat_moves,false,false]);
  // waves.push(["rattata",10,15,1,100,10,10,rat_moves,false,false]);
  // waves.push(["rattata",15,20,0,200,1,5,rat_moves,false,false]);

  let spots = [];
  // spot center = x + 16
  spots.push([134,134]);
  spots.push([184,234]);
  spots.push([234,134]);
  spots.push([334,234]);
  spots.push([434,234]);
  spots.push([534,234]);

  let candies = [];
  candies.push([500,300]);
  candies.push([500,310]);
  candies.push([500,290]);
  candies.push([510,300]);
  candies.push([490,300]);

  // LEVEL_TWO = new Level(paths,waves,spots);
  resourceLoader.addLevel("LEVEL_THREE",paths,waves,spots,candies);
}
