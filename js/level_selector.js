class LevelSelector{
  constructor(){
    this._levels = [];
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
      {text:"Return to tittle",color:"white",offsetX:"center",offsetY:"middle",size:16},
      function(){self.return();}
    );
    this.returnButton.preventDestroy = true;

    // SAVE
    grad = ctx.createLinearGradient(700,300,800,450);
      grad.addColorStop(0.2, "rgb(30, 100, 30)");
      grad.addColorStop(0.4, "rgb(0, 100, 0)");
      grad.addColorStop(0.6, "rgb(30, 100, 30)");
    this.saveButton = new Clickable(
      {x: 700, y:300, width:100, height:100, color:grad, outline:{thickness:2,color:"black"}},
      {text:"Save",color:"gold",offsetX:"center",offsetY:"middle",size:16},
      function(value){if (value == 1){partyManager.save(); Scene.display("Saved!","green");}}
    );
    this.saveButton.preventDestroy = true;

    // RESET
    grad = ctx.createLinearGradient(900,300,1100,450);
    grad.addColorStop(0.2, "rgb(100, 30, 30)");
      grad.addColorStop(0.4, "rgb(100, 0, 0)");
      grad.addColorStop(0.6, "rgb(100, 30, 30)");
    this.resetButton = new Clickable(
      {x: 900, y:300, width:100, height:100, color:grad, outline:{thickness:2,color:"black"}},
      {text:"Reset",color:"red",offsetX:"center",offsetY:"middle",size:16},
      function(value){if (value == 1 && window.confirm("Are you sure?")){partyManager.resetParty();}}
    );
    this.resetButton.preventDestroy = true;

    // STORAGE
    grad = ctx.createLinearGradient(700,450,1000,600);
      grad.addColorStop(0, "rgb(0,63,127)");
      grad.addColorStop(0.5, "rgb(63,63,31)");
      grad.addColorStop(1, "rgb(0,63,127)");
    this.storageButton = new Clickable(
      {x: 700, y:450, width:300, height:100, color:grad, outline:{thickness:2,color:"black"}},
      {text:"Manage Party",color:"gold",offsetX:"center",offsetY:"middle",size:16},
      function(value){if (value == 1){partyManager.openStorage();}}
    );
    this.storageButton.preventDestroy = true;

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
    SCENES.get("levelSelector").addElement(lvl);
  }
  startLevel(level){
    this.activeLevel = level;
    level.start();
    Scene.setActiveScene(SCENES.get("insideOfLevel"));
  }
  return(){
    if (this.activeLevel != null) {
      this.activeLevel.destroy();
      Instance.activeLevel = null;
    }
    Scene.setActiveScene(SCENES.get("levelSelector"));
    partyManager.party.restore();
  }
}
