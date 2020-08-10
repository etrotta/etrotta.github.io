class Vector2{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
}
Point = Vector2;

class Path{
  points = [];
  constructor(){
    for (var point of arguments){
      this.points.push(point);
    }
  }
  get points(){
    return this.points;
  }
  set points(n){
    throw new Error("Cannot overwrite a path points!");
  }
  getPoint(i,safe = false){
    return this.points[safe ? Math.min(i,this.points.length-1) : i];
  }
  get length(){
    return this.points.length;
  }
  get start() {
    return this.points[0];
  }
  get end() {
    return this.points[this.points.length-1];
  }
  draw(){
    ctx.fillStyle = "rbga(63,63,255,0.3)";
    for (let i = 1; i < this.points.length; i++){
      const point1 = this.points[i-1];
      const point2 = this.points[i];
      const startX = Math.min(point1.x, point2.x);
      const startY = Math.min(point1.y, point2.y);
      const width = Math.max(Math.abs(point1.x - point2.x),20);
      const height = Math.max(Math.abs(point1.y - point2.y),20);
      ctx.fillRect(startX - 10, startY - 10, width, height);
    }
  }
}
