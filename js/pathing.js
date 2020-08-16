class Vector2{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
}
Point = Vector2;

class Path{
  constructor(others){
    this._points = [];
    this.connection = null;
    for (let object of [...arguments].slice(1)){
      if (object instanceof Point){
        this.points.push(object);
      }
      else if (others[object.path] instanceof Path){
        this.connection = others[object.path];
        this.connectionStartAt = object.startAt;
      }
      else if (object.loop === true){
        this.loop = true;
        this.loopStartAt = object.startAt;
      }
    }
  }
  get points(){
    if (this.connection == null) return this._points;
    else {
        return this._points.concat( this.connection.points.slice(this.connectionStartAt) );
    }
  }
  set points(n){
    throw new Error("Cannot overwrite a path points!");
  }
  getPoint(i,safe = false){
    if (this.loop && i >= this._points.length){
      i = i - this.points.length;
      return this.points[i%(this.points.length - this.loopStartAt)+this.loopStartAt];
    }
    return this.points[safe ? Math.clamp(i,0,this.points.length-1) : i];
  }
  get length(){
    return this.points.length + (this.connection != null ? this.connection.points.length - this.connectionStartAt : 0);
  }
  get start() {
    return this.points[0];
  }
  get end() {
    if (this.connection != null){
      return this.connection.end;
    }
    return this.points[this.points.length-1];
  }
  draw(){
    ctx.fillStyle = "rbga(63,63,255,0.3)";
    let array = this._points.slice();
    if (this.connection != null) {
      array.push(this.connection.points[this.connectionStartAt]);
    }
    if (this.loop) {
      array.push(this.points[this.loopStartAt]);
    }
    for (let i = 1; i < array.length; i++){
      const point1 = array[i-1];
      const point2 = array[i];
      const startX = Math.min(point1.x, point2.x);
      const startY = Math.min(point1.y, point2.y);
      const width = Math.max(Math.abs(point1.x - point2.x),20);
      const height = Math.max(Math.abs(point1.y - point2.y),20);
      ctx.fillRect(startX - 10, startY - 10, width, height);
    }
  }
}
