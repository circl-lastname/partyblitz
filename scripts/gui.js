const gui = {};

gui.TOP = 0;
gui.LEFT = 0;
gui.CENTER = 1;
gui.BOTTOM = 2;
gui.RIGHT = 2;

gui.resolvePosition = function (widget, anchorX, anchorY, x, y) {
  let posX;
  let posY;
  
  switch (anchorX) {
    case this.LEFT:
      posX = x;
    break;
    case this.CENTER:
      posX = x - widget.width / 2;
    break;
    case this.RIGHT:
      posX = x - widget.width + 1;
    break;
  }
  
  switch (anchorY) {
    case this.TOP:
      posY = y;
    break;
    case this.CENTER:
      posY = y - widget.height / 2;
    break;
    case this.BOTTOM:
      posY = y - widget.height + 1;
    break;
  }
  
  return { x: posX, y: posY };
};

gui.label = {};

gui.label.create = function (text) {
  let widget = {
    text: text
  };
  
  let metrics = rendering.ctx.measureText(text);
  widget.width = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
  widget.height = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
  
  return widget;
};

gui.label.setPosition = function (widget, anchorX, anchorY, x, y) {
  let pos = gui.resolvePosition(widget, anchorX, anchorY, x, y);
  widget.x = pos.x;
  widget.y = pos.y;
};

gui.label.render = function (widget) {
  rendering.ctx.fillText(widget.text, widget.x, widget.y);
};

gui.multiLabel = {};

gui.multiLabel.create = function (text) {
  let widget = {
    width: 0,
    height: 0,
    lines: []
  };
  
  let lines = text.split("\n");
  
  for (let line of lines) {
    widget.lines.push({
      text: line,
      yOffset: widget.height
    });
    
    widget.height += 5;
    
    let metrics = rendering.ctx.measureText(line);
    
    let width = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    if (width > widget.width) {
      widget.width = width;
    }
    
    widget.height += metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
  }
  
  return widget;
};

gui.multiLabel.setPosition = function (widget, anchorX, anchorY, x, y) {
  let pos = gui.resolvePosition(widget, anchorX, anchorY, x, y);
  widget.x = pos.x;
  widget.y = pos.y;
};

gui.multiLabel.render = function (widget) {
  for (let line of widget.lines) {
    rendering.ctx.fillText(line.text, widget.x, widget.y + line.yOffset);
  }
};

gui.roundButton = {};

gui.roundButton.create = function (r, g, b, image) {
  let widget = {
    width: 108,
    height: 108,
    colorTop: `rgb(${r} ${g} ${b})`,
    colorBottom: `rgb(${Math.floor(r*0.7)} ${Math.floor(g*0.7)} ${Math.floor(b*0.7)})`,
    image: image
  };
  
  return widget;
};

gui.roundButton.setPosition = function (widget, anchorX, anchorY, x, y) {
  let pos = gui.resolvePosition(widget, anchorX, anchorY, x, y);
  
  widget.arcX = pos.x + 54;
  widget.arcY = pos.y + 54;
  widget.imageX = pos.x + 18;
  widget.imageY = pos.y + 18;
  
  widget.gradient = rendering.ctx.createLinearGradient(pos.x, pos.y + 9, pos.x, pos.y + 99);
  widget.gradient.addColorStop(0, widget.colorTop);
  widget.gradient.addColorStop(1, widget.colorBottom);
};

gui.roundButton.render = function (widget) {
  rendering.ctx.save();
  
  rendering.ctx.beginPath();
  rendering.ctx.arc(widget.arcX, widget.arcY, 45, 0, 2*Math.PI);
  rendering.ctx.closePath();
  
  rendering.ctx.lineWidth = 18;
  rendering.ctx.strokeStyle = "#000000";
  rendering.ctx.stroke();
  
  rendering.ctx.fillStyle = widget.gradient;
  rendering.ctx.fill();
  
  rendering.ctx.drawImage(widget.image, widget.imageX, widget.imageY, 72, 72);
  
  rendering.ctx.restore();
};
