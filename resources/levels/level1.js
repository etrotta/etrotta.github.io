{
  let paths = [];
  let path1 = new Path(new Point(0,100), new Point(100,100), new Point(200,100), new Point(200,200), new Point(100,200), {loop:true,startAt:1});
  paths.push(path1);

  let waves = [];
  waves.push(new Wave("rattata",5,path1,40,1,5,[tackle],false));

  let spots = [];
  spots.push(new Spot(50,50));
  spots.push(new Spot(150,150));
  // spots.push(new Spot(240,250));
  // spots.push(new Spot(140,340));

  LEVEL_ONE = new Level(paths,waves,spots);
}
