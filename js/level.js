class Level{
  constructor(paths,waves,spots){
    this.paths = paths;
    this.__waves = waves.slice(0);
    this.waves = null;
    this.spots = spots;
    this.wildPokes = [];
    // this.party = Party.getPlayerParty();
    this.party = party;
  }
  draw(){
    const self = this;
    for (let thing of this.paths.concat(this.spots).concat(this.wildPokes)){ //Yep, monstruous.
      thing.draw();
    }
    party.draw();
    pokeball.draw();
    if (SELECTED != null && SELECTED.drawRange != null) {SELECTED.draw(mousePos.x,mousePos.y); SELECTED.drawRange(mousePos.x,mousePos.y);}
    if (SELECTED == pokeball) SELECTED.draw(mousePos.x,mousePos.y,25,0.5);
  }
  update(){
    const self = this;
    for (let thing of this.waves.concat(this.wildPokes)){
      thing.update(self);
    }
    party.update(self);
  }
  start(){
    this.waves = this.__waves.slice(0);
    for (let wave of this.waves){
      wave.count = wave.originalCount;
      wave.ticks = wave.startingTicks;
    }
    Instance.activeLevel = this;
  }
  destroy(){
    const self = this;
    Instance.activeLevel = null;
    for (let wave of this.waves){
      wave.destroy(self);
    }
    while (this.wildPokes.length) this.wildPokes.pop().__faint();
    for (let slot of this.party.slots){
      if (slot.pokemon != null) slot.pokemon.setSpot(null);
    }
  }
}
