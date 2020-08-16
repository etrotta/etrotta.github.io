class Pokeball{
  constructor(x,y,radius = 40){
    this.x = x;
    this.y = y;
    this.radius = radius;

    const self = this;
    this.hitbox = new Dragable(
      {x: x - radius, y:y - radius, width:radius * 2, height:radius * 2, draw:self, drawArgs:[], mouseDrawArgs:[25,0.5] },
      null,
      {pokeball:self},
      function(){paused = true;},
      function(dropable){paused = false; if (dropable != null && dropable.packet.pokemon instanceof Enemy){ partyManager.party.tryCatch(dropable.packet.pokemon); }}
    );
  }
  draw(x = this.x, y = this.y, r = this.radius, alpha = 1){
    if (drewThisTick.indexOf("pokeball_with"+r+alpha) != -1) return; drewThisTick.push("pokeball_with"+r+alpha);
    ctx.lineWidth = 2;
    for (let i = 0; i < 2; i++){
      ctx.fillStyle = i ? `rgba(255,0,0,${alpha})` : `rgba(127,127,127,${alpha})`;
      ctx.beginPath();
      ctx.arc(x,y,r,i * Math.PI,(i+1) * Math.PI, false); // outer (filled)
      ctx.arc(x,y,r/2.5,(i+1) * Math.PI,i * Math.PI, true); // inner (unfills it)
      ctx.fill();
    }
    ctx.strokeStyle = `rgba(0,0,0,${alpha})`;
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2);
    ctx.moveTo(x - r, y);
    ctx.lineTo(x - r/2.5, y);
    ctx.moveTo(x + r/2.5, y);
    ctx.lineTo(x + r, y);
    ctx.stroke();
    ctx.fillStyle = `rgba(127,127,127,${alpha})`;
    ctx.beginPath();
    ctx.arc(x,y,r/2.5+1,0,Math.PI*2);
    ctx.fill();
    ctx.beginPath()
    ctx.arc(x,y,r/2.5,0,Math.PI*2);
    ctx.stroke();
    let grad = ctx.createRadialGradient(x - r/2.5, y - r/2.5, 0, x , y, r+2);
    grad.addColorStop(0,"rgba(255,255,255,0)");
    grad.addColorStop(1,`rgba(255,255,255,${0.25 * alpha})`);
    // grad.addColorStop(1,`rgba(0,0,255,${alpha})`);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x,y,r+2,0,2 * Math.PI);
    ctx.fill()
  }
}
