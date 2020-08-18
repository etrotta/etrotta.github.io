{
  let rat_moves = ["tackle"];
  let bulb_moves = ["vine_whip"];

  let paths = [];
  // let path1 = new Path(new Point(0,100), new Point(100,100), new Point(100,300), new Point(500,300));
  // let path2 = new Path(new Point(200,100), {path:path1, startAt:1});
  // paths.push(path1);
  // paths.push(path2);
  paths.push([new Point(0,100), new Point(100,100), new Point(100,300), new Point(500,300)]);
  paths.push([new Point(200,100), {path:0, startAt:1}]);

  let waves = [];
  // waves.push(new Wave("rattata",10,path1,100,1,-1,rat_moves,false,false));
  // waves.push(new Wave("bulbasaur",20,path2,400,10,1,bulb_moves,true,true));
  waves.push({id:"rattata",minLevel:10,maxLevel:12,path:0,delay:100,startingDelay:1,count:-1,moves:rat_moves,boss:false,shouldAttack:false});
  waves.push({id:"bulbasaur",minLevel:20,maxLevel:20,path:1,delay:400,startingDelay:10,count:1,moves:bulb_moves,boss:true,shouldAttack:true});

  let spots = [];
  // spots.push(new Spot(50,125));
  // spots.push(new Spot(140,250));
  // spots.push(new Spot(240,250));
  // spots.push(new Spot(440,250));
  spots.push([50,125]);
  spots.push([140,250]);
  spots.push([240,250]);
  spots.push([440,250]);

  // LEVEL_TWO = new Level(paths,waves,spots);
  resourceLoader.addLevel("LEVEL_TWO",paths,waves,spots);
}
