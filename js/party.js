class Party{
  constructor(slots = new Array(6)){
    this.slots = slots;
  }
  tryCatch(pokemon){
    if (this.canCatch(pokemon)){
      return this.catch(pokemon);
    }
    else return false;
  }
  canCatch(pokemon){
    if (pokemon.canCatch()) return true;
    else return false;
  }
  catch(enemy){
    let newPoke = new Ally(enemy.id,enemy.level,enemy.moves);
    partyManager.storage.add(newPoke);
    Instance.activeLevel.wildPokes.remove(enemy);
    for (let i = 0; i < this.slots.length; i++){
      if (this.slots[i].pokemon == null){
        this.slots[i].pokemon = newPoke;
        newPoke.slot = i;
        return true;
      }
    }
    newPoke.slot = null;
    return false;
  }
  addExp(exp){
    for (let slot of this.slots){
      if (slot.pokemon != null) slot.pokemon.addExp(exp);
    }
  }
  restore(){
    for (let slot of this.slots){
      if (slot.pokemon != null) {
        slot.pokemon.heal();
        slot.pokemon.attackTicks = [32,32,32,32];
        slot.pokemon.changedAttackTicks = 10;
      }
    }
  }
  update(level){
    for (let slot of this.slots){
      if (slot.pokemon != null){
        slot.pokemon.update(level);
      }
      // slot.update();
    }
  }
  draw(){
    for (let slot of this.slots){
      slot.draw();
    }

  }
  // populateSlots(party){
  //   if (party == null) party = [
  //     new Ally("bulbasaur",10,[MOVES["tackle"],MOVES["vineWhip"]]),
  //     new Ally("bulbasaur",10,[MOVES["vineWhip"],MOVES["tackle"]]),
  //     new Ally("rattata",10,[MOVES["tackle"]]),
  //     null,
  //     null,
  //     null
  //   ]; //placeholder
  //   for (let i = 0; i < 6; i++){
  //     this.slots[i] = new Slot(i * 120 + 20, 350,100,225, party[i]);
  //   }
  // }
  populateSlots(){
    for (let i = 0; i < 6; i++){
      this.slots[i] = new Slot(i * 120 + 20, 350,100,225, null);
    }
  }
  reset(){
    for (let slot of this.slots) slot.pokemon = null;
  }

}
