function loadInfoScene(scene,dragable){
  //Pokemon
  scene.addElement(new Display(
    {x:100, y:60, width:128, height:40, color:"rgba(0,0,0,0.1)", outline:{color:"black",thickness:2}},
    {text:"Pokemon", color:"black", offsetX:"center", offsetY:"center", size:16}
  ))
  const pokemon = dragable.packet.poke;
  scene.addElement(new Display(
    {x: 100, y:100, width:128, height:128, outline:{color:"black",thickness:2}, draw:pokemon, drawArgs:[false]},
    {text:pokemon.data.name, color:"gold", offsetX:"center", offsetY:90, size:14}
  ));
  //Moves
  scene.addElement(new Display(
    {x:100, y:260, width:128, height:40, color:"rgba(0,0,0,0.1)", outline:{color:"black",thickness:2}},
    {text:"Moves", color:"black", offsetX:"center", offsetY:"center", size:16}
  ))
  for (let i = 0; i < 4; i++){
    const move = pokemon.moves.length <= i ? null : pokemon.moves[i];
    console.log(move);
    scene.addElement(new Clickable(
      {x: 100, y:300 + 32*i, width:128, height:32, color:(pokemon.selectedMove == i ? "rgba(0,0,127,0.4)" : "rgba(0,0,0,0.2)"), outline:{color:"black",thickness:2}},
      {text:move == null ? "empty" : move.name, color: move == null ? "black" : move.type.color, offsetX:"center", offsetY:"center", size:14},
      move == null ? null : function(){
        scene.elements[3 + pokemon.selectedMove].rect.color = "rgba(0,0,0,0.2)";
        this.rect.color = "rgba(0,0,127,0.4)";
        pokemon.selectedMove = i;
      }
    ));
  }
  //Return to party
  let grad = ctx.createLinearGradient(canvas.width-150,0,canvas.width,0);
  grad.addColorStop(0, "black"); grad.addColorStop(0.5, "rgb(48, 12, 103)"); grad.addColorStop(1, "black");

  scene.addElement(new Clickable(
    {x: canvas.width - 150, y:0, width:150, height:50, color:grad, outline:{thickness:2,color:"black"}},
    {text:"Return to Party",color:"white",offsetX:"center",offsetY:"center",size:16},
    function(value){if (value == 1){partyManager.openStorage();}}
  ));
}
