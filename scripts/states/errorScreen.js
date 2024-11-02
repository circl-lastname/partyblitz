states.errorScreen = {};
states.errorScreen.stateDataHooks = {};

states.errorScreen.stateDataHooks.error = function () {
  let metrics = rendering.ctx.measureText(stateData.error);
  localStateData.descriptionY = 32 + metrics.actualBoundingBoxDescent + 32;
};

states.errorScreen.render = function () {
  rendering.ctx.save();
  
  rendering.ctx.fillStyle = "#ffffff";
  rendering.fillBackground();
  
  rendering.ctx.fillStyle = "#000000";
  rendering.ctx.fillText(stateData.error, 32, 32);
  
  rendering.ctx.font = "37px Grandstander, sans-serif";
  rendering.ctx.fillText(stateData.description, 32, localStateData.descriptionY);
  
  rendering.ctx.restore();
};
