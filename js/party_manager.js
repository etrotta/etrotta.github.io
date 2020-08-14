// const defaultParty =  "[{\"id\":\"bulbasaur\",\"level\":5,\"experience\":0,\"moves\":[\"tackle\",\"vineWhip\"]}]";
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
    const self = this;
    storageOpen = true;
    this.dropables = [];
    let len = this.party.slots.length;
    for (let i = 0; i < len; i++){
      const poke = this.party.slots[i].pokemon;
      const dropable = new Dropable(
        {x: 40 + 128*i, y:80, width:128, height:128, color:"rgba(0,0,0,0.2)", outline:{thickness:2,color:"black"}, draw:poke},
        {text:poke == null ? "" : poke.id,color:"gold",offsetX:"center",offsetY:96,size:14},
        function(dragable){
          let poke = dragable.packet.poke;
          if (poke instanceof Pokemon) {
            let slot = dragable.packet.slot;
            if (slot != null && slot.pokemon != null) {
              slot.pokemon.slot = null;
              slot.pokemon = null;
            }
            if (this.packet.slot.pokemon != null) this.packet.slot.pokemon.slot = null;
            this.packet.slot.pokemon = poke; poke.slot = this.packet.slotIndex; self.updateStorage();
          }
        },
        {slot:self.party.slots[i],slotIndex:i}
      );
      dropable.setActive(true);
      this.dropables.push(dropable);
    }
    len = this.storage.size;
    for (let i = 0; i < len; i++){
      const poke = this.storage.pokemons[i];
      const dragable = new Dragable(
        {x: 128 + 96*i, y:244, width:96, height:96, color:"rgba(0,0,0,0.2)", outline:{thickness:2,color:"black"}, draw:poke},
        {text:poke == null ? "" : poke.id,color:"gold",offsetX:"center",offsetY:64,size:12},
        null,
        {poke:poke, slot:(poke.slot == null ? null : self.party.slots[poke.slot]),slotIndex:poke.slot}
      );
      dragable.setActive(true);
      this.dragables.push(dragable);
    }
  }
  drawStorage(){
    for (let clickable of this.dropables.concat(this.dragables)){
      clickable.draw();
    }
  }
  updateStorage(){
    this.closeStorage();
    this.openStorage();
  }
  closeStorage(){
    for (let dropable of this.dropables){
      dropables.remove(dropable);
    }
    this.dropables = [];
    for (let dragable of this.dragables){
      dragables.remove(dragable);
    }
    this.dragables = [];
    storageOpen = false;
  }
}
