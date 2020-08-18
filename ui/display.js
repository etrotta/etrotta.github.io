class Display extends UIButton{
  constructor(rect,text, autoActivate = true, autoAdd = true){
    super(rect,text,null);
    if (autoActivate) this.setActive(true);
    if (autoAdd) displays.push(this);
  }
  destroy(){
    if (this.preventDestroy) return;
    displays.remove(this);
    this.setActive(false);
  }
}
