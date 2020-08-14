class Dropable{
  constructor(rect,text,func,packet, autoAdd = true){
    this.rect = rect;
    this.text = text;
    this.func = func;
    this.packet = packet;
    this.active = false;
    if (autoAdd) dropables.push(this);
  }
  draw(){
    if (!this.active) return;
    const rect = this.rect;
    ctx.fillStyle = rect.color;
    ctx.fillRect(rect.x,rect.y,rect.width,rect.height);

    const other = rect.draw;
    if (other != null){
      other.draw(rect.x + rect.width / 2, rect.y + rect.height / 2);
    }

    const outline = rect.outline;
    if (outline != null){
      ctx.strokeStyle = outline.color;
      ctx.lineWidth = outline.thickness;
      ctx.strokeRect(rect.x,rect.y,rect.width,rect.height);
    }

    const text = this.text;
    if (text != null){
      ctx.font = `${text.size}px arial`;
      ctx.fillStyle = text.color;
      ctx.lineWidth = 1;
      ctx.textAlign = text.offsetX == "center" ? "center" : "start";
      ctx.textBaseline = text.offsetY == "center" ? "middle" : "top";
      let offsetX;
        if (typeof(text.offsetX) == "number") offsetX = text.offsetX;
        if (text.offsetX == "center") offsetX = rect.width/2;
      let offsetY;
        if (typeof(text.offsetY) == "number") offsetY = text.offsetY;
        if (text.offsetY == "center") offsetY = rect.height/2;
      ctx.fillText(text.text, rect.x + 2 + offsetX, rect.y + offsetY);
    }
  }
  onClick(value){
    if (value == 0){
      return;
    }
    if (value == 1){
      if (DRAGGING != null){
        DRAGGING.onDrop(this);
        this.onDrop(DRAGGING);
      }
    }
  }
  onDrop(draggable){
    if (this.func != null) this.func(draggable);
  }
  setActive(value){
    this.active = value;
  }
}
