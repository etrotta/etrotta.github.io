function setScenes(){
  //LEVEL SCENE
  let insideOfLevelScene = new Scene(
    {shouldDraw:true},
    levelSelector.returnButton,
    pokeball.hitbox,
    ...partyManager.party.slots.map(slot => slot.hitbox)
  );
  SCENES.set("insideOfLevel", insideOfLevelScene);

  //LEVEL SELECTOR SCENE
  let levelSelectorScene = new Scene(
    {shouldDraw:true},
    levelSelector.saveButton,
    levelSelector.resetButton,
    levelSelector.storageButton
  );
  SCENES.set("levelSelector", levelSelectorScene);

  //PARTY MANAGER SCENE
  let partyManagerScene = new Scene(
    {shouldDraw:true,resetOnClose:true}
  );
  SCENES.set("partyManager", partyManagerScene);

  //POKEMON INFO SCENE
  let pokemonInfoScene = new Scene(
    {shouldDraw:true, loader:loadInfoScene, resetOnClose:true}
  )
  SCENES.set("pokemonInfo",pokemonInfoScene);
}
