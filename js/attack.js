class Attack{
  constructor(data,spawner,target,resolve){
    this.data = data;
    this.spawner = spawner;
    this.x = spawner.x;
    this.y = spawner.y;
    this.target = target;
    this.resolve = resolve;
    // this.resolveVars = vars;
  }
  update(){
    if (this.target === undefined || this.target === null || this.target.health <= 0){
      this.destroy();
      return;
    }
    this.x = Math.clamp(this.target.x, this.x - 8, this.x + 8 );
    this.y = Math.clamp(this.target.y, this.y - 8, this.y + 8 );
    if (this.x == this.target.x && this.y == this.target.y){
      // this.draw();
      // this.resolve(this.resolveVars);
      this.resolve();
      this.destroy();
      return;
    }
    // this.draw();
  }
  draw(){
    ctx.fillStyle = "rgba(47, 179, 214, 0.6)";
    ctx.beginPath();
    ctx.arc(this.x,this.y,5,0,Math.PI*2);
    ctx.fill();
  }
  destroy(){
    this.spawner.attacks.remove(this);
  }
}
