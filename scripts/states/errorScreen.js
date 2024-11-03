states.errorScreen = {};

states.errorScreen.enter = function () {
  rendering.ctx.save();
  
  let metrics = rendering.ctx.measureText(stateData.error);
  
  rendering.ctx.font = "37px Grandstander, sans-serif";
  localStateData.description = gui.multiLine.create(32, 32 + metrics.actualBoundingBoxDescent + 32, stateData.description);
  
  rendering.ctx.restore();
};

states.errorScreen.render = function () {
  rendering.ctx.save();
  
  rendering.ctx.fillStyle = "#ffffff";
  rendering.fillBackground();
  
  rendering.ctx.fillStyle = "#000000";
  rendering.ctx.fillText(stateData.error, 32, 32);
  
  rendering.ctx.font = "37px Grandstander, sans-serif";
  gui.multiLine.render(localStateData.description);
  
  rendering.ctx.restore();
};
