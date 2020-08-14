class LevelSelector{
  constructor(){
    this._levels = [...arguments];
    this.clickables = [];
    this.activeLevel = null;
    this.grad = ctx.createLinearGradient(0,0,canvas.width,canvas.height);
      this.grad.addColorStop(0, "black");
      this.grad.addColorStop(0.2, "blue");
      this.grad.addColorStop(0.4, "black");
      this.grad.addColorStop(0.6, "blue");
      this.grad.addColorStop(0.8, "black");
      this.grad.addColorStop(1, "blue");

    const self = this;
    // RETURN
    let grad = ctx.createLinearGradient(canvas.width-150,0,canvas.width,0);
      grad.addColorStop(0, "black");
      grad.addColorStop(0.5, "rgb(48, 12, 103)");
      grad.addColorStop(1, "black");
    this.returnButton = new Clickable(
      {x: canvas.width - 150, y:0, width:150, height:50, color:grad, outline:{thickness:2,color:"black"}},
      {text:"Return to tittle",color:"white",offsetX:"center",offsetY:"center",size:16},
      function(){self.return();}
    )
    // clickables.push(this.returnButton);

    // SAVE
    grad = ctx.createLinearGradient(700,300,800,450);
      grad.addColorStop(0.2, "rgb(30, 100, 30)");
      grad.addColorStop(0.4, "rgb(0, 100, 0)");
      grad.addColorStop(0.6, "rgb(30, 100, 30)");
    this.saveButton = new Clickable(
      {x: 700, y:300, width:100, height:100, color:grad, outline:{thickness:2,color:"black"}},
      {text:"Save",color:"gold",offsetX:"center",offsetY:"center",size:16},
      function(value){if (value == 1){partyManager.save(); alert("Saved!");}}
    )
    // clickables.push(this.saveButton);
    // RESET
    grad = ctx.createLinearGradient(900,300,1100,450);
    grad.addColorStop(0.2, "rgb(100, 30, 30)");
      grad.addColorStop(0.4, "rgb(100, 0, 0)");
      grad.addColorStop(0.6, "rgb(100, 30, 30)");
    this.resetButton = new Clickable(
      {x: 900, y:300, width:100, height:100, color:grad, outline:{thickness:2,color:"black"}},
      {text:"Reset",color:"red",offsetX:"center",offsetY:"center",size:16},
      function(value){if (value == 1){partyManager.resetParty(); alert("Done!");}}
    )
    // clickables.push(this.resetButton);
    // STORAGE
    grad = ctx.createLinearGradient(700,450,1000,600);
      grad.addColorStop(0, "rgb(0,63,127)");
      grad.addColorStop(0.5, "rgb(63,63,31)");
      grad.addColorStop(1, "rgb(0,63,127)");
    this.storageButton = new Clickable(
      {x: 700, y:450, width:300, height:100, color:grad, outline:{thickness:2,color:"black"}},
      {text:"Manage Party",color:"red",offsetX:"center",offsetY:"center",size:16},
      function(value){if (value == 1){partyManager.openStorage(); self.activate(false);}}
    )
    // clickables.push(this.storageButton);
    // grad = ctx.createLinearGradient(900,300,1000,300);
    // grad.addColorStop(0, "rgb(0,0,127)");
    //   grad.addColorStop(0.5, "blue");
    //   grad.addColorStop(1, "rgb(0,0,127)");
    // this.resetButton = new Clickable(
    //   {x: 900, y:300, width:100, height:40, color:grad, outline:{thickness:2,color:"black"}},
    //   {text:"The Lab",color:"gold",offsetX:18,offsetY:15,size:16},
    //   function(value){if (value == 1){partyManager.resetParty(); alert("Done!");}}
    // )
  }
  addLevel(level){
    const self = this;
    const index = this._levels.push(level); //returns the length, but I was already doing +1 before anyway
    const lvl = new Clickable(
      {x:25+125*(index),y:300,width:100,height:100,color:this.grad, outline:{thickness:2,color:"black"}},
      {text:`Level ${index}`,color:"gold",offsetX:10,offsetY:10,size:16},
      function(){self.startLevel(self._levels[index-1]);}
    );
    this.clickables.push(lvl);
    // clickables.push(lvl);
  }
  activate(value = true){
    for (let level of this.clickables){
      level.setActive(value);
    }
    this.saveButton.setActive(value);
    this.resetButton.setActive(value);
    this.storageButton.setActive(value);
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
    if (this.saveButton.active) this.saveButton.draw();
    if (this.returnButton.active) this.returnButton.draw();
    if (this.storageButton.active) this.storageButton.draw();
    if (this.resetButton.active) this.resetButton.draw();
    if (storageOpen) partyManager.drawStorage();
  }
  return(){
    partyManager.party.restore();
    this.activate(true);
    if (this.activeLevel != null) this.activeLevel.destroy();
    if (storageOpen) partyManager.closeStorage();
  }
}
