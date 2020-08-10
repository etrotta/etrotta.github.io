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
        pokes.remove(enemy);
        slot.pokemon = new Ally(enemy.id,enemy.level,"red");
        return true;
      }
    }
    return false;
  }
  update(){
    for (let slot of this.slots){
      if (slot.pokemon != null){
        slot.pokemon.update();
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
      new Ally("bulbasaur",100),
      new Ally("bulbasaur",100),
      new Ally("bulbasaur",100),
      null,
      null,
      null
    ]; //placeholder
    for (let i = 0; i < 6; i++){
      this.slots[i] = new Slot(i * 75 + 25, 400,60,100, party[i]);
    }
  }

}
