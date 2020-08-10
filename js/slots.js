class Slot{
  constructor(x,y,width,height,pokemon){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.pokemon = pokemon;
  }
  draw(){
    ctx.fillStyle = "black";
    ctx.fillRect(this.x,this.y,this.width,this.height);
    ctx.fillStyle = "green";
    if (this.pokemon != null) this.pokemon.draw(this.x + this.width/2,this.y + this.height/4);
  }
}
