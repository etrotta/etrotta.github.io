class Clickable extends UIButton{
  constructor(rect,text,clickFunction, hoverFunction, autoAdd = true){
    super(rect,text,null);
    this.clickFunction = clickFunction;
    this.hoverFunction = hoverFunction;
    if (autoAdd) clickables.push(this);
  }
  onClick(value){
    if (value == 0 && PRE_CLICK == null) PRE_CLICK = this;
    if (value == 1 && PRE_CLICK == this) {
      if (this.clickFunction != null) this.clickFunction(value);
      PRE_CLICK = null;
    }
  }
  onHover(){
    if (this.hoverFunction != null) this.hoverFunction();
  }
  destroy(){
    if (this.preventDestroy) return;
    clickables.remove(this);
    this.setActive(false);
  }
}
