const defaultParty =
  "[\"{\\\"id\\\":\\\"bulbasaur\\\",\\\"level\\\":5,\\\"experience\\\":0,\\\"moves\\\":[\\\"tackle\\\",\\\"vineWhip\\\"]}\"]";

class PartyManager{
  constructor(party,storage){
    this.party = party;
    this.storage = storage;
    this.dropables = [];
    this.dragables = [];
  }
  save(){
    let data = [];
    for (let poke of this.storage.pokemons){
      data.push(poke.save());
    }
    localStorage.ptd_party = JSON.stringify(data);
  }
  load(data = localStorage.ptd_party){
    if (data == null) data = defaultParty;
    data = JSON.parse(data);
    const len = data.length;
    for (let i = 0; i < len; i++){
      if (data[i] != null){
        let poke = Ally.load(JSON.parse(data[i]));
        this.storage.add(poke);
        if (i < 6) {
          this.party.slots[i].pokemon = poke;
          poke.slot = i;
        }
      }
    }
  }
  resetParty(){
    this.storage.reset();
    this.party.reset();
    this.load(defaultParty);
  }
  openStorage(){
    const scene = SCENES.get("partyManager");
    scene.addElement(levelSelector.returnButton);

    const self = this;
    this.dropables = [];
    let len = this.party.slots.length;
    for (let i = 0; i < len; i++){
      const poke = this.party.slots[i].pokemon;
      const dragable = new Dragable(
        {x: 40 + 128*i, y:80, width:128, height:128, draw:poke, drawArgs:[false]},
        {text:poke == null ? "" : poke.id,color:"gold",offsetX:"center",offsetY:96,size:14},
        {poke:poke},
        null,
        null,
        null,
        function(){Scene.setActiveScene(SCENES.get("pokemonInfo"),this);}
      );
      const dropable = new Dropable(
        {x: 40 + 128*i, y:80, width:128, height:128, color:"rgba(0,0,0,0.2)", outline:{thickness:2,color:"black"}},
        null,
        {slot:self.party.slots[i],slotIndex:i,dragable:dragable},
        function(dragable){
          const newPoke = dragable.packet.poke;
          if (newPoke instanceof Ally && newPoke != this.packet.dragable.packet.poke) {
            if (this.packet.dragable.packet.poke != null){
              this.packet.dragable.packet.poke.slot = null;
            }
            this.packet.dragable.packet.poke = newPoke;
            this.packet.dragable.rect.draw = newPoke;
            this.packet.dragable.text.text = newPoke == null ? "" : newPoke.id;
            const oldSlotIndex = newPoke.slot;
            if (oldSlotIndex != null){
              self.party.slots[oldSlotIndex].pokemon = null;
              const e = scene.elements[1 + oldSlotIndex*2];
              e.packet.poke = null; e.packet.dragable.packet.poke = null; e.packet.dragable.rect.draw = null; e.packet.dragable.text.text = "";
            }
            newPoke.slot = this.packet.slotIndex;
            self.party.slots[this.packet.slotIndex].pokemon = newPoke;
          }
        }
      );
      scene.addElement(dropable);
      scene.addElement(dragable);
    }
    len = this.storage.size;
    for (let i = 0; i < len; i++){
      const poke = this.storage.pokemons[i];
      const dragable = new Dragable(
        {x: 128 + 96*i, y:244, width:96, height:96, color:"rgba(0,0,0,0.2)", outline:{thickness:2,color:"black"}, draw:poke, drawArgs:[false]},
        {text:poke == null ? "" : poke.id,color:"gold",offsetX:"center",offsetY:64,size:12},
        {poke:poke}
      );
      scene.addElement(dragable);
    }
    Scene.setActiveScene(scene);
  }
  drawStorage(){
    for (let clickable of this.dropables.concat(this.dragables)){
      clickable.draw();
    }
  }
}
