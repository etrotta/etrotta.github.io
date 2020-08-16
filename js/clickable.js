class Clickable extends UIButton{
  constructor(rect,text,clickFunction, hoverFunction, autoAdd = true){
    super(rect,text,null);
    this.clickFunction = clickFunction;
    this.hoverFunction = hoverFunction;
    if (autoAdd) clickables.push(this);
  }
  onClick(value){
    if (this.clickFunction != null) this.clickFunction(value);
  }
  onHover(){
    if (this.hoverFunction != null) this.hoverFunction();
  }
  destroy(){
    clickables.remove(this);
    delete this;
  }
}
