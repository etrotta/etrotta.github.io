class Dropable extends UIButton{
  constructor(rect,text,packet,onDropFunction, hoverFunction, autoAdd = true){
    super(rect,text,packet);
    this.onDropFunction = onDropFunction;
    this.hoverFunction = hoverFunction;
    if (autoAdd) dropables.push(this);
  }
  onClick(value){
    if (value == 0){
      return;
    }
    if (value == 1){
      if (DRAGGING != null){
        this.onDrop(DRAGGING);
        DRAGGING.onDrop(this);
        return;
      }
    }
  }
  onDrop(draggable){
    if (this.onDropFunction != null) this.onDropFunction(draggable);
  }
  onHover(){
    if (this.hoverFunction != null) this.hoverFunction();
  }
  destroy(){
    if (this.preventDestroy) return;
    this.setActive(false);
    dropables.remove(this);
  }
}
