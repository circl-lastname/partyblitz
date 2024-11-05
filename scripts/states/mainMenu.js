states.mainMenu = {};
states.mainMenu.playerDataHooks = {};

states.mainMenu.enter = function () {
  localStateData.username = gui.label.create(playerData.username);
  gui.label.setPosition(localStateData.username, gui.CENTER, gui.CENTER, 1280/2, 720/2);
  
  localStateData.githubButton = gui.roundButton.create(255, 255, 255, assets.images.githubLogo);
  gui.roundButton.setPosition(localStateData.githubButton, gui.LEFT, gui.BOTTOM, 16, 720-16);
};

states.mainMenu.playerDataHooks.username = function () {
  localStateData.username = gui.label.create(playerData.username);
  gui.label.setPosition(localStateData.username, gui.CENTER, gui.CENTER, 1280/2, 720/2);
  
  rendering.scheduleRender();
};

states.mainMenu.render = function () {
  rendering.ctx.fillStyle = "#ffffff";
  rendering.fillBackground();
  
  rendering.ctx.fillStyle = "#000000";
  gui.label.render(localStateData.username);
  
  gui.roundButton.render(localStateData.githubButton);
};
