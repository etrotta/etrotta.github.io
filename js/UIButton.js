class UIButton{
  constructor(rect,text,packet){
    this.rect = rect;
    this.text = text;
    this.packet = packet;
    this.active = false;
  }
  draw(x = this.rect.x, y = this.rect.y){
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
      let args = []; if (rect.drawArgs != null) {args = rect.drawArgs;}
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
    let args = []; if (this.rect.drawArgs != null) args = this.rect.drawArgs;
    if (other != null){
      other.draw(x, y, ...args);
    }
    ctx.globalApha = 0;
  }
  setActive(value){
    this.active = value;
  }
}
