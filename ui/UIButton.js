clickables = [];
dragables = [];
dropables = [];
displays = [];
class UIButton{
  constructor(rect,text,packet){
    this.rect = rect;
    this.text = text;
    this.packet = packet;
    this.active = false;
  }
  draw(x = this.rect.x, y = this.rect.y, mouse = false){
    if (!this.active) return;
    const rect = this.rect;
    if (rect.color != null){
      ctx.fillStyle = rect.color;
      ctx.fillRect(x,y,rect.width,rect.height);
    }

    const sprite = rect.draw;
    if (sprite != null){
      let offsetX = rect.spriteOffsetX || 0;
      let offsetY = rect.spriteOffsetY || 0;
      let args = [];
      if (rect.drawArgs != null) {
        args = rect.drawArgs;
      }
      sprite.draw(x + rect.width / 2 + offsetX, y + rect.height / 2 + offsetY, ...args);
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
      ctx.textAlign = typeof(text.offsetX) === "string" ? text.offsetX : "start";
      ctx.textBaseline = typeof(text.offsetY) === "string" ? text.offsetY : "top";
      let offsetX = 0;
        if (typeof(text.offsetX) == "number") offsetX = text.offsetX;
        if (text.offsetX == "center") offsetX = text.startXAt == null ? rect.width/2 : text.startXAt;
      let offsetY = 0;
        if (typeof(text.offsetY) == "number") offsetY = text.offsetY;
        if (text.offsetY == "middle") offsetY = rect.height/2;
      ctx.fillText(text.text, x + 2 + offsetX, y + offsetY);
    }
  }
  drawOnMouse(x,y){
    ctx.globalApha = 0.5;
    const other = this.rect.draw;
    let args = [];
    if (this.rect.mouseDrawArgs != null) args = this.rect.mouseDrawArgs; else if (this.rect.drawArgs != null) args = this.rect.drawArgs;
    if (other != null){
      other.draw(x, y, ...args);
    }
    ctx.globalApha = 0;
  }
  setActive(value){
    this.active = value;
  }
}
