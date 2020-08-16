class Slot{
  constructor(x,y,width,height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this._pokemon = null;

    const self = this;

    const grad = ctx.createLinearGradient(this.x,this.y - 20,this.x + this.width,this.y + this.height + 20);
      grad.addColorStop(0, "black");
      grad.addColorStop(0.5, "rgb(48, 12, 103)");
      grad.addColorStop(1, "black");

    this.hitbox = new Dragable(
      {x: x, y:y, width:width, height:height, color:grad, outline:{thickness:2,color:"black"}, spriteOffsetY: - height/3},
      null,
      {pokemon:null, selectable:null},
      function(){if (self.pokemon != null) {self.pokemon.hitbox.startFunction(); DRAGGING = self.pokemon.hitbox;}},
      function(dropable){if (self.pokemon != null) self.pokemon.hitbox.dropFunction(dropable);},
      function(){if (self.pokemon != null) self.pokemon.hitbox.hoverFunction();}
    );
  }
  get pokemon(){
    return this._pokemon;
  }
  set pokemon(poke){
    this._pokemon = poke;
    this.hitbox.rect.draw = poke;
    this.hitbox.packet.pokemon = poke;
    this.hitbox.packet.selectable = poke;
  }
  draw(){

    this.hitbox.draw();
    if (this.pokemon != null) {
      this.pokemon.displayExpOnSlot(this.x + this.width/2,this.y + this.height/4 + 20);
      for (let i = this.pokemon.moves.length - 1; i >= 0; i--){
        this.pokemon.displayMoveOnSlot(this.x + this.width/2,this.y + this.height/4 + 20,i);
      }
    }
  }
}
