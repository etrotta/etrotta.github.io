function loadRelearnScene(scene,pokemon){
  //Background
  let grad = ctx.createLinearGradient(50,50,canvas.width - 50,canvas.height - 50);
  let colors = ["rgb(63,90,63)","rgb(90,63,63)","rgb(63,63,90)"]
  for (let i = 1; i < 10; i++){
    grad.addColorStop(i / 10, colors[i%colors.length]);
  }
  scene.addElement(new Display(
    {x:50, y:50, width:canvas.width - 100, height:canvas.height - 100, color:grad, outline:{color:"black",thickness:2}}
  ))
  //Moves
  scene.addElement(new Display(
    {x:50, y:50, width:128, height:100, color:"rgba(255,255,255,0.8)", outline:{color:"black",thickness:2}},
    {text:"Select a move", color:"black", offsetX:"center", offsetY:"middle", size:16}
  ))
  const movesStartAt = scene.elements.length;
  const moves = POKEMONS.get(pokemon.id).levelMoves;
  let offsetX = 0;
  let offsetY = 0;
  for (let data of moves){
    const move = MOVES.get(data.id);
    if (data.level > pokemon.level || pokemon.moves.indexOf(move) != -1) continue;
    scene.addElement(new Clickable(
      {x: 50 + 128 * offsetX, y:150 + 50*offsetY, width:128, height:50, color:"rgba(0,0,0,0.2)", outline:{color:"black",thickness:2}},
      {text:move.name, color: move.type.color, offsetX:"center", offsetY:"middle", size:14},
      function(){
        Scene.addPopup(SCENES.get("newMovePopup"),pokemon,move,function(replacedMove){
          if (replacedMove != null){
            const element = SCENES.get("pokemonInfo").getElementByText(replacedMove.name);
            element.text.text = move.name;
            element.text.color = move.type.color;
          }  
          Scene.removePopup(scene);
        });
      }
    ));
    offsetY++;
    if (offsetY == 8){
      offsetY = -2;
      offsetX++;
    }
  }
  //Return to party
  grad = ctx.createLinearGradient(canvas.width-150,0,canvas.width,0);
  grad.addColorStop(0, "black"); grad.addColorStop(0.5, "rgb(48, 12, 103)"); grad.addColorStop(1, "black");

  scene.addElement(new Clickable(
    {x: canvas.width - 150, y:0, width:150, height:50, color:grad, outline:{thickness:2,color:"black"}},
    {text:"Return to Pokemon",color:"white",offsetX:"center",offsetY:"middle",size:16},
    function(value){if (value == 1){Scene.removePopup(scene);}}
  ));
}
