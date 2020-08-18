function loadNewMoveScene(scene,pokemon,newMove,resolve = null,bgRect = null){
  //Background
  let grad = ctx.createLinearGradient(50,50,canvas.width - 50,canvas.height - 50);
  let colors = ["rgb(63,90,63)","rgb(90,63,63)","rgb(63,63,90)"]
  for (let i = 1; i < 10; i++){
    grad.addColorStop(i / 10, colors[i%colors.length]);
  }
  if (bgRect == null) bgRect = {x:50, y:50, width:canvas.width - 100, height:canvas.height - 100, color:grad, outline:{color:"black",thickness:2}};
  else {bgRect.color = grad; bgRect.outline = {color:"black",thickness:2};}
  scene.addElement(new Display(bgRect))
  //Moves
  scene.addElement(new Display(
    {x:300, y:150, width:512, height:64, color:"rgba(0,0,0,0.1)", outline:{color:"black",thickness:2}},
    {text:"Select a move to replace", color:"black", offsetX:"center", offsetY:"middle", size:24}
  ))
  const movesStartAt = scene.elements.length;
  for (let i = 0; i < 4; i++){
    const move = pokemon.moves.length <= i ? null : pokemon.moves[i];
    scene.addElement(new Clickable(
      {x: 300, y:214 + 48*i, width:128, height:48, color:(pokemon.selectedMove == i ? "rgba(0,0,127,0.4)" : "rgba(0,0,0,0.2)"), outline:{color:"black",thickness:2}},
      {text:move == null ? "empty" : move.name, color: move == null ? "black" : move.type.color, offsetX:"center", offsetY:"middle", size:14},
      move == null ? null : function(){
        pokemon.moves[i] = newMove;
        Scene.removePopup(scene);
        if (resolve != null) resolve(move);
      }
    ));
  }
  // New move
  scene.addElement(new Display(
    {x:428, y:214, width:384, height:192, color:"rgba(0,0,0,0.1)", outline:{color:"black",thickness:2}},
    {text:pokemon.name + " is trying to learn " + newMove.name, color:newMove.type.color, size:20, offsetX:"center", offsetY:"middle"}
  ))
  //Return to party
  grad = ctx.createLinearGradient(canvas.width-150,0,canvas.width,0);
  grad.addColorStop(0, "black"); grad.addColorStop(0.5, "rgb(48, 12, 103)"); grad.addColorStop(1, "black");

  scene.addElement(new Clickable(
    {x: canvas.width - 150, y:0, width:150, height:50, color:grad, outline:{thickness:2,color:"black"}},
    {text:"Cancel",color:"red",offsetX:"center",offsetY:"middle",size:16},
    function(value){if (value == 1){if (resolve != null) resolve(null); Scene.removePopup(scene);}}
  ));
}
