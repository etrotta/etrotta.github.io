class Slot{
  constructor(x,y,width,height,pokemon){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.pokemon = pokemon;
  }
  draw(){
    let grad = ctx.createLinearGradient(this.x,this.y - 20,this.x + this.width,this.y + this.height + 20);
    grad.addColorStop(0, "black");
    grad.addColorStop(0.5, "rgb(48, 12, 103)");
    grad.addColorStop(1, "black");
    ctx.fillStyle = grad;
    ctx.fillRect(this.x,this.y,this.width,this.height);
    ctx.fillStyle = "green";
    if (this.pokemon != null) {
      this.pokemon.draw(this.x + this.width/2,this.y + this.height/4);
      // this.pokemon.displayHealthOnSlot(this.x + this.width/2,this.y + this.height/4 + 50); //the pokemon already draws it themselves
      this.pokemon.displayExpOnSlot(this.x + this.width/2,this.y + this.height/4 + 40);
      for (let i = this.pokemon.moves.length - 1; i >= 0; i--){
        this.pokemon.displayMoveOnSlot(this.x + this.width/2,this.y + this.height/4 + 70,i);
      }
    }
  }
}
