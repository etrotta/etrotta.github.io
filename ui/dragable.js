class Dragable extends UIButton{
  constructor(rect,text,packet,startFunction,dropFunction,hoverFunction, clickFunction, autoAdd = true){
    super(rect,text,packet);
    this.startFunction = startFunction;
    this.dropFunction = dropFunction;
    this.hoverFunction = hoverFunction;
    this.clickFunction = clickFunction;
    if (autoAdd) dragables.push(this);
  }

  onClick(value){
    if (value == 0){
      // DRAGGING = this;
      PRE_DRAG = this;
      if (this.clickFunction != null && PRE_CLICK == null) PRE_CLICK = this;
      if (this.packet.selectable != null) LAST_SELECTED = this.packet.selectable;
      return;
    }
    if (value == 1){
      if (this.clickFunction != null && PRE_CLICK == this) {
        this.clickFunction();
        PRE_CLICK = null;
        PRE_DRAG = null;
      }
      return;
    }
  }
  startDrag(){
    DRAGGING = this;
    PRE_DRAG = null;
    if (PRE_CLICK == this) { PRE_CLICK = null; }
    if (this.startFunction != null) this.startFunction();
  }
  onDrop(dropable){
    if (this.dropFunction != null) this.dropFunction(dropable);
    DRAGGING = null;
  }
  onHover(){
    if (this.hoverFunction != null) this.hoverFunction();
  }
  destroy(){
    if (this.preventDestroy) return;
    dragables.remove(this);
    this.setActive(false);
  }
}
