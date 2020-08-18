class Display extends UIButton{
  constructor(rect,text, autoActivate = true, autoAdd = true){
    super(rect,text,null);
    if (autoActivate) this.setActive(true);
    if (autoAdd) displays.push(this);
  }
  destroy(){
    displays.remove(this);
    delete this;
  }
}
