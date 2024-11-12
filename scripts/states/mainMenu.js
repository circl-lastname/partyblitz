states.mainMenu = {};
states.mainMenu.playerDataHooks = {};

states.mainMenu.enter = function () {
  rendering.ctx.save();
  
  let y = 32;
  
  rendering.ctx.font = "144px Grandstander, sans-serif";
  localStateData.partyblitz = gui.label.create("Partyblitz");
  gui.label.setPosition(localStateData.partyblitz, gui.CENTER, gui.TOP, 1280/2, y);
  
  y += localStateData.partyblitz.height + 32;
  
  rendering.ctx.font = "72px Grandstander, sans-serif";
  localStateData.username = gui.label.create(playerData.username);
  
  localStateData.usernameButton = gui.roundButton.create(255, 160, 0, assets.images.edit, () => {
    let username = prompt("Enter new username");
    
    if (username) {
      localStorage.username = username;
      server.call("setUsername", username);
    }
  });
  
  localStateData.usernameY = y;
  let pos = gui.resolvePosition(localStateData.username.width + 16 + localStateData.usernameButton.width,
                                localStateData.usernameButton.height,
                                gui.CENTER, gui.TOP, 1280/2, y);
  
  gui.label.setPosition(localStateData.username, gui.LEFT, gui.CENTER, pos.x, pos.y + localStateData.usernameButton.height/2);
  gui.roundButton.setPosition(localStateData.usernameButton, gui.LEFT, gui.TOP, pos.x + localStateData.username.width + 16, pos.y);
  
  y += localStateData.usernameButton.height + 16;
  
  localStateData.playButton = gui.button.create(0, 160, 0, locale.play, () => {
    console.log("pressed");
  });
  gui.button.setPosition(localStateData.playButton, gui.CENTER, gui.TOP, 1280/2, y);
  
  
  localStateData.githubButton = gui.roundButton.create(255, 255, 255, assets.images.githubLogo, () => {
    window.open("https://github.com/circl-lastname/partyblitz", "_blank");
  });
  gui.roundButton.setPosition(localStateData.githubButton, gui.LEFT, gui.BOTTOM, 16, 720-16);
  
  localStateData.fullscreenButton = gui.roundButton.create(255, 160, 0, assets.images.fullscreen, () => {
    rendering.canvas.requestFullscreen();
  });
  gui.roundButton.setPosition(localStateData.fullscreenButton, gui.RIGHT, gui.TOP, 1280-16, 16);
  
  rendering.ctx.restore();
};

states.mainMenu.playerDataHooks.username = function () {
  rendering.ctx.save();
  
  localStateData.username = gui.label.create(playerData.username);
  
  let pos = gui.resolvePosition(localStateData.username.width + 16 + localStateData.usernameButton.width,
                                localStateData.usernameButton.height,
                                gui.CENTER, gui.TOP, 1280/2, localStateData.usernameY);
  
  gui.label.setPosition(localStateData.username, gui.LEFT, gui.CENTER, pos.x, pos.y + localStateData.usernameButton.height/2);
  gui.roundButton.setPosition(localStateData.usernameButton, gui.LEFT, gui.TOP, pos.x + localStateData.username.width + 16, pos.y);
  
  rendering.ctx.restore();
  
  rendering.scheduleRender();
};

states.mainMenu.mouseDown = function (x, y) {
  if (!gui.roundButton.hitTest(localStateData.usernameButton, x, y))
  if (!gui.button.hitTest(localStateData.playButton, x, y))
  if (!gui.roundButton.hitTest(localStateData.githubButton, x, y))
    gui.roundButton.hitTest(localStateData.fullscreenButton, x, y)
};

states.mainMenu.render = function () {
  rendering.ctx.save();
  
  rendering.ctx.fillStyle = "#ffffff";
  rendering.fillBackground();
  
  rendering.ctx.fillStyle = "#000000";
  rendering.ctx.font = "144px Grandstander, sans-serif";
  gui.label.render(localStateData.partyblitz);
  
  rendering.ctx.font = "72px Grandstander, sans-serif";
  gui.label.render(localStateData.username);
  
  gui.roundButton.render(localStateData.usernameButton);
  
  gui.button.render(localStateData.playButton);
  
  gui.roundButton.render(localStateData.githubButton);
  gui.roundButton.render(localStateData.fullscreenButton);
  
  rendering.ctx.restore();
};
