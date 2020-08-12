class Spot{
  width = 32;
  height = 32;
  pokemon = null;
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  draw(){
    ctx.strokeStyle = "yellow";
    ctx.strokeRect(this.x,this.y,this.width,this.height);
    if (this.pokemon != null){
      this.pokemon.draw();
    }
  }
  hasPokemon(){
    return this.pokemon != null;
  }
}
