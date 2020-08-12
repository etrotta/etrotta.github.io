{
  let paths = [];
  let path1 = new Path(new Point(0,100), new Point(100,100), new Point(100,300), new Point(500,300));
  let path2 = new Path(new Point(200,100), {path:path1, startAt:1});
  paths.push(path1);
  paths.push(path2);

  let waves = [];
  waves.push(new Wave("rattata",10,path1,100,1,-1,[tackle],false,false));
  waves.push(new Wave("bulbasaur",20,path2,400,10,1,[vineWhip],true,true));

  let spots = [];
  spots.push(new Spot(50,125));
  spots.push(new Spot(140,250));
  spots.push(new Spot(240,250));
  spots.push(new Spot(440,250));

  LEVEL_TWO = new Level(paths,waves,spots);
}
