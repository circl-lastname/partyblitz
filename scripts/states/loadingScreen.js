states.loadingScreen = {};

states.loadingScreen.enter = function () {
  localStateData.text = gui.label.create(locale.loading);
  gui.label.setPosition(localStateData.text, gui.CENTER, gui.CENTER, 1280/2, 720/2);
};

states.loadingScreen.render = function () {
  rendering.ctx.fillStyle = "#000000";
  rendering.fillBackground();
  
  rendering.ctx.fillStyle = "#ffffff";
  gui.label.render(localStateData.text);
};
