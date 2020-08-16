class Spot{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.width = 32;
    this.height = 32;
    this.pokemon = null;
    const self = this;
    this.hitbox = new Dropable(
      {x: x, y:y, width:32, height:32, outline:{thickness:2,color:"yellow"}, draw:self.pokemon},
      null,
      {spot:self}
    )
  }
  draw(){
    ctx.strokeStyle = "yellow";
    ctx.lineWidth = paused ? 2 : 1;
    ctx.strokeRect(this.x,this.y,this.width,this.height);
    if (this.pokemon != null){
      this.pokemon.draw();
    }
  }
  hasPokemon(){
    return this.pokemon != null;
  }
}
