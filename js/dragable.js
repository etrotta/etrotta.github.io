class Dragable{
  constructor(rect,text,func,packet, autoAdd = true){
    this.rect = rect;
    this.text = text;
    this.func = func;
    this.packet = packet;
    this.active = false;
    if (autoAdd) dragables.push(this);
  }
  draw(x = this.rect.x, y = this.rect.y){
    if (!this.active) return;
    const rect = this.rect;
    ctx.fillStyle = rect.color;
    ctx.fillRect(x,y,rect.width,rect.height);

    const other = rect.draw;
    if (other != null){
      other.draw(x + rect.width / 2, y + rect.height / 2);
    }

    const outline = rect.outline;
    if (outline != null){
      ctx.strokeStyle = outline.color;
      ctx.lineWidth = outline.thickness;
      ctx.strokeRect(x,y,rect.width,rect.height);
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
      ctx.fillText(text.text, x + 2 + offsetX, y + offsetY);
    }
  }
  drawOnMouse(x,y){
    ctx.globalApha = 0.5;
    const other = this.rect.draw;
    if (other != null){
      other.draw(x, y, undefined, false);
    }
    ctx.globalApha = 0;
  }
  onClick(value){
    if (value == 0){
      DRAGGING = this;
      return;
    }
    if (value == 1){
      return;
    }
  }
  onDrop(dropable){
    if (this.func != null) this.func(dropable);
  }
  setActive(value){
    this.active = value;
  }
}
