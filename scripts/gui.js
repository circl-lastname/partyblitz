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
      text: line,
      y: y,
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
