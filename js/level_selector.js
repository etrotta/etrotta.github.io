class LevelSelector{
  constructor(){
    this._levels = [...arguments];
    this.clickables = [];
    this.activeLevel = null;
    const self = this;
    let grad = ctx.createLinearGradient(0,0,canvas.width,canvas.height);
      grad.addColorStop(0, "black");
      grad.addColorStop(0.2, "blue");
      grad.addColorStop(0.4, "black");
      grad.addColorStop(0.6, "blue");
      grad.addColorStop(0.8, "black");
      grad.addColorStop(1, "blue");
    for (let i = this._levels.length - 1; i >= 0; i--){
      let lvl = new Clickable(
        {x:200*(i+1),y:300,width:100,height:100,color:grad},
        // {x:0,y:0,width:1000,height:1000,color:grad},
        {text:`Level ${i}`,color:"yellow",offsetX:10,offsetY:10,size:16},
        function(){self.startLevel(self._levels[i]);}
      );
      this.clickables.push(lvl);
      clickables.push(lvl);
    }
    grad = ctx.createLinearGradient(canvas.width-150,0,canvas.width,0);
      grad.addColorStop(0, "black");
      grad.addColorStop(0.5, "rgb(48, 12, 103)");
      grad.addColorStop(1, "black");
    this.returnButton = new Clickable(
      {x: canvas.width - 150, y:0, width:150, height:50, color:grad},
      {text:"Return to tittle",color:"white",offsetX:20,offsetY:20,size:16},
      function(){self.return();}
    )
    clickables.push(self.returnButton);
  }
  activate(value = true){
    for (let level of this.clickables){
      level.setActive(value);
    }
    this.returnButton.setActive(!value);
  }
  startLevel(level){
    this.activate(false);
    this.activeLevel = level;
    level.start();
  }
  draw(){
    for (let clickable of levelSelector.clickables){
      if (clickable.active) clickable.draw();
    }
    if (this.returnButton.active) this.returnButton.draw();
  }
  return(){
    this.activate(true);
    this.activeLevel.destroy();
  }
}
