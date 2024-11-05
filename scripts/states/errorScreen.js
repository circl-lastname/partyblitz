states.errorScreen = {};

states.errorScreen.enter = function () {
  rendering.ctx.save();
  
  localStateData.error = gui.label.create(stateData.error);
  gui.label.setPosition(localStateData.error, gui.LEFT, gui.TOP, 16, 32);
  
  rendering.ctx.font = "36px Grandstander, sans-serif";
  localStateData.description = gui.multiLabel.create(stateData.description);
  gui.multiLabel.setPosition(localStateData.description, gui.LEFT, gui.TOP, 16, 32 + localStateData.error.height + 16);
  
  rendering.ctx.restore();
};

states.errorScreen.render = function () {
  rendering.ctx.save();
  
  rendering.ctx.fillStyle = "#ffffff";
  rendering.fillBackground();
  
  rendering.ctx.fillStyle = "#000000";
  gui.label.render(localStateData.error);
  
  rendering.ctx.font = "36px Grandstander, sans-serif";
  gui.multiLabel.render(localStateData.description);
  
  rendering.ctx.restore();
};
