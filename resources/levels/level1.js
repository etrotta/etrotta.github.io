{
  let rat_moves = ["tackle"];

  let paths = [];
  // let path1 = new Path(new Point(0,100), new Point(100,100), new Point(200,100), new Point(200,200), new Point(100,200), {loop:true,startAt:1});
  // let path1 = [new Point(0,100), new Point(100,100), new Point(200,100), new Point(200,200), new Point(100,200), {loop:true,startAt:1}];
  // paths.push(path1);
  paths.push([new Point(0,100), new Point(100,100), new Point(200,100), new Point(200,200), new Point(100,200), {loop:true,startAt:1}]);

  let waves = [];
  // waves.push(new Wave("rattata",5,path1,40,1,5,moves,false));
  // waves.push(["rattata",5,8,0,40,1,5,moves,false]);
  waves.push({id:"rattata",minLevel:5,maxLevel:8,path:0,delay:40,startingDelay:1,count:5,moves:rat_moves,boss:false,shouldAttack:false});

  let spots = [];
  // spots.push(new Spot(50,50));
  // spots.push(new Spot(150,150));
  spots.push([50,50]);
  spots.push([134,134]);

  // LEVEL_ONE = new Level(paths,waves,spots);
  resourceLoader.addLevel("LEVEL_ONE",
    paths,
    waves,
    spots
  );
}
