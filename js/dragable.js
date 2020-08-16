class Dragable extends UIButton{
  constructor(rect,text,packet,startFunction,dropFunction,hoverFunction, autoAdd = true){
    super(rect,text,packet);
    this.startFunction = startFunction;
    this.dropFunction = dropFunction;
    this.hoverFunction = hoverFunction;
    if (autoAdd) dragables.push(this);
  }
  onClick(value){
    if (value == 0){
      DRAGGING = this;
      if (this.startFunction != null) this.startFunction();
      if (this.packet.selectable != null) LAST_SELECTED = this.packet.selectable;
      return;
    }
    if (value == 1){
      return;
    }
  }
  onDrop(dropable){
    if (this.dropFunction != null) this.dropFunction(dropable);
    DRAGGING = null;
  }
  onHover(){
    if (this.hoverFunction != null) this.hoverFunction();
  }
  destroy(){
    dragables.remove(this);
    delete this;
  }
}
