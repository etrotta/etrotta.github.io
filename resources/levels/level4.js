{
  let rat_moves = ["tackle"];

  let paths = [];
  // let path1 = new Path(new Point(0,100), new Point(100,100), new Point(100,300), new Point(500,300));
  // let path2 = new Path(new Point(200,100), {path:path1, startAt:1});
  // paths.push(path1);
  // paths.push(path2);
  paths.push([new Point(100,100), new Point(300,100), new Point(300,300), new Point(100,300), {loop:true, startAt:0}]);
  // paths.push([new Point(500,300), new Point(600,300), new Point(600,100), new Point(500,100), {loop:true, startAt:0}]);

  let waves = [];
  // waves.push(new Wave("rattata",10,path1,100,1,-1,rat_moves,false,false));
  // waves.push(new Wave("bulbasaur",20,path2,400,10,1,bulb_moves,true,true));
  waves.push({
    id:"rattata",
    minLevel:95,
    maxLevel:100,
    path:0,
    delay:10,
    startingDelay:1,
    count:1,
    moves:rat_moves,
    shouldAttack:true,
    boss:true
  });
  // constructor(id,minLevel,maxLevel,path,delay,startingDelay,count,moves,shouldAttack,boss,forceEnd,onEnd,name){
  // waves.push(["rattata",95,100,1,100,1,100,rat_moves,false,true]);

  let spots = [];
  // spot center = x + 16
  spots.push([134,134]);
  spots.push([134,234]);
  spots.push([234,134]);
  spots.push([234,234]);

  // spots.push([534,134]);
  // spots.push([534,234]);

  // LEVEL_TWO = new Level(paths,waves,spots);
  resourceLoader.addLevel("HELL",paths,waves,spots);
}
