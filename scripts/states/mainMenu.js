states.mainMenu = {};
states.mainMenu.playerDataHooks = {};

states.mainMenu.enter = function () {
  let metrics = rendering.ctx.measureText(playerData.username);
  localStateData.usernameX = 1280/2 - metrics.width/2;
  localStateData.usernameY = 720/2 - metrics.actualBoundingBoxDescent/2;
  
  localStateData.githubButton = gui.roundButton.create(16, 16, 255, 255, 255, assets.images.githubLogo);
};

states.mainMenu.playerDataHooks.username = function () {
  let metrics = rendering.ctx.measureText(playerData.username);
  localStateData.usernameX = 1280/2 - metrics.width/2;
  localStateData.usernameY = 720/2 - metrics.actualBoundingBoxDescent/2;
  
  rendering.scheduleRender();
};

states.mainMenu.render = function () {
  rendering.ctx.fillStyle = "#ffffff";
  rendering.fillBackground();
  
  rendering.ctx.fillStyle = "#000000";
  rendering.ctx.fillText(playerData.username, localStateData.usernameX, localStateData.usernameY);
  
  gui.roundButton.render(localStateData.githubButton);
};
