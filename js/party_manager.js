// const defaultParty =  "[{\"id\":\"bulbasaur\",\"level\":5,\"experience\":0,\"moves\":[\"tackle\",\"vineWhip\"]}]";
const defaultParty =
  "[\"{\\\"id\\\":\\\"bulbasaur\\\",\\\"level\\\":5,\\\"experience\\\":0,\\\"moves\\\":[\\\"tackle\\\",\\\"vineWhip\\\"]}\"]";

class PartyManager{
  constructor(party){
    this.party = party;
  }
  saveParty(){
    let data = [];
    for (let slot of this.party.slots){
      if (slot.pokemon != null) data.push(slot.pokemon.save());
    }
    localStorage.ptd_party = JSON.stringify(data);
  }
  loadParty(){
    let data = localStorage.ptd_party || defaultParty;
    data = JSON.parse(data);
    for (let i = 0; i < 6; i++){
      if (data[i] != null){
        this.party.slots[i].pokemon = Ally.load(JSON.parse(data[i]));
        // console.log(data);
        // this.party.slots[0].pokemon = Ally.load(data[0]);
      }
    }
  }
  resetParty(){
    let data = defaultParty;
    data = JSON.parse(data);
    for (let i = 0; i < 6; i++){
      if (data[i] != null){
        this.party.slots[i].pokemon = Ally.load(JSON.parse(data[i]));
      }
    }
  }
}
