class Attack{
  constructor(data,spawner,target,resolve,color = "rgb(47, 179, 214)"){
    this.data = data;
    this.spawner = spawner;
    this.x = spawner.x;
    this.y = spawner.y;
    this.target = target;
    this.resolve = resolve;
    this.color = color;
  }
  update(){
    if (this.target === undefined || this.target === null || this.target.health <= 0 || this.target.x == -1 || this.target.y == -1){
      this.destroy();
      return;
    }
    this.x = Math.clamp(this.target.x, this.x - 8, this.x + 8 );
    this.y = Math.clamp(this.target.y, this.y - 8, this.y + 8 );
    if (this.x == this.target.x && this.y == this.target.y){
      this.resolve();
      this.destroy();
      return;
    }
  }
  draw(){
    ctx.fillStyle = this.color;
    ctx.globalAlpha = 0.6;
    ctx.beginPath();
    ctx.arc(this.x,this.y,5,0,Math.PI*2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
  destroy(){
    this.spawner.attacks.remove(this);
  }
}
