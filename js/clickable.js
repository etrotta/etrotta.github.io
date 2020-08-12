class Clickable{
  constructor(rect,text,func){
    this.rect = rect;
    this.text = text;
    this.func = func;
    this.active = false;
  }
  draw(){
    if (!this.active) return;
    const rect = this.rect;
    ctx.fillStyle = rect.color;
    ctx.fillRect(rect.x,rect.y,rect.width,rect.height);

    const text = this.text;
    ctx.font = `${text.size}px arial`;
    ctx.fillStyle = text.color;
    ctx.lineWidth = 1;
    ctx.fillText(text.text, rect.x + 2 + text.offsetX, rect.y + 10 + text.offsetY);
  }
  onClick(value){
    if (this.func != null) this.func(value);
  }
  setActive(value){
    this.active = value;
  }
}
