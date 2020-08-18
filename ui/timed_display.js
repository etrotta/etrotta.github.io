class TimedDisplay extends UIButton{
  constructor(time,rect,text){
    super(rect,text,null);
    this.remainingTime = time;
    this.setActive(true);
    displays.push(this);
  }
  onDraw(){
    this.remainingTime--;
    if (this.remainingTime <= 0){
      this.destroy();
    }
  }
  destroy(){
    Instance.popups.remove(this);
    this.setActive(false);
    displays.remove(this);
  }
}
