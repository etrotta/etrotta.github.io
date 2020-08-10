class Pokeball{
  constructor(x,y,radius = 40){
    this.x = x;
    this.y = y;
    this.radius = radius;
  }
  draw(x = this.x, y = this.y, r = this.radius, alpha = 1){
    for (let i = 0; i < 2; i++){
      ctx.fillStyle = i ? `rgba(255,0,0,${alpha})` : `rgba(127,127,127,${alpha})`;
      ctx.beginPath();
      ctx.arc(x,y,r,i * Math.PI,(i+1) * Math.PI);
      ctx.fill()
    }
    ctx.strokeStyle = `rgba(0,0,0,${alpha})`;
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2);
    ctx.moveTo(x - r, y);
    ctx.lineTo(x + r, y);
    ctx.moveTo(x-r/2.5,y);
    ctx.stroke();
    ctx.fillStyle = `rgba(127,127,127,${alpha})`;
    ctx.beginPath();
    ctx.arc(x,y,r/2.5+1,0,Math.PI*2);
    ctx.fill();
    ctx.beginPath()
    ctx.arc(x,y,r/2.5,0,Math.PI*2);
    ctx.stroke();
  }
}
