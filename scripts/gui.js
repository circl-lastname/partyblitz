const gui = {};

gui.multiLine = {};

gui.multiLine.create = function (x, y, text) {
  let widget = {
    x: x,
    lines: []
  };
  
  let lines = text.split("\n");
  
  for (let line of lines) {
    let metrics = rendering.ctx.measureText(line);
    widget.lines.push({
      y: y,
      text: line
    });
    y += metrics.fontBoundingBoxDescent + 5;
  }
  
  return widget;
};

gui.multiLine.render = function (widget) {
  for (let line of widget.lines) {
    rendering.ctx.fillText(line.text, widget.x, line.y);
  }
};

gui.roundButton = {};

gui.roundButton.create = function (x, y, r, g, b, image) {
  let widget = {
    arcX: x+54,
    arcY: y+54,
    imageX: x+18,
    imageY: y+18,
    image: image,
    width: 108,
    height: 108,
  };
  
  widget.gradient = rendering.ctx.createLinearGradient(x+54, y+9, x+54, y+99);
  widget.gradient.addColorStop(0, `rgb(${r} ${g} ${b})`);
  widget.gradient.addColorStop(1, `rgb(${Math.max(r-64, 0)} ${Math.max(g-64, 0)} ${Math.max(b-64, 0)})`);
  
  return widget;
};

gui.roundButton.render = function (widget) {
  rendering.ctx.save();
  
  rendering.ctx.beginPath();
  rendering.ctx.arc(widget.arcX, widget.arcY, 45, 0, 2*Math.PI);
  rendering.ctx.closePath();
  
  rendering.ctx.lineWidth = 18;
  rendering.ctx.strokeStyle = "#404040";
  rendering.ctx.stroke();
  
  rendering.ctx.fillStyle = widget.gradient;
  rendering.ctx.fill();
  
  rendering.ctx.drawImage(widget.image, widget.imageX, widget.imageY, 72, 72);
  
  rendering.ctx.restore();
};
