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
    for (let slot of this.slots){
      if (slot.pokemon == null){
        Instance.activeLevel.wildPokes.remove(enemy);
        slot.pokemon = new Ally(enemy.id,enemy.level,enemy.moves);
        return true;
      }
    }
    return false;
  }
  addExp(exp){
    for (let slot of this.slots){
      if (slot.pokemon != null) slot.pokemon.addExp(exp);
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
  populateSlots(party){
    if (party == null) party = [
      new Ally("bulbasaur",10,[tackle,vineWhip]),
      new Ally("bulbasaur",10,[vineWhip,tackle]),
      new Ally("rattata",10,[tackle]),
      null,
      null,
      null
    ]; //placeholder
    for (let i = 0; i < 6; i++){
      this.slots[i] = new Slot(i * 85 + 20, 350,75,225, party[i]);
    }
  }

}
