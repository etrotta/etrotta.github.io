class Candy{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.pokemon = null;
  }
  draw(x = this.x, y = this.y){
    ctx.fillStyle = "rgba(0,0,255,0.6)";
    ctx.beginPath();
    ctx.arc(x,y,5,0,Math.PI*2);
    ctx.fill();
  }
}
