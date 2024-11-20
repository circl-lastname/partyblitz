var playerData = {};

var state = "loadingScreen";
var stateData = {};
var playerStateData = {};
var localStateData = {};

var overlay = undefined;

async function main() {
  let font = new FontFace("Grandstander", "url(assets/fonts/Grandstander.ttf)");
  document.fonts.add(font);
  await font.load();
  
  rendering.init();
  states[state].enter();
  rendering.scheduleRender();
  
  rendering.canvas.addEventListener("mousedown", (e) => {
    let x = e.x * window.devicePixelRatio;
    let y = e.y * window.devicePixelRatio;
    
    if (!overlay) {
      if (states[state].mouseDown) {
        states[state].mouseDown(x, y);
      }
    } else {
      if (overlays[overlay].mouseDown) {
        overlays[overlay].mouseDown(x, y);
      }
    }
  });
  
  await assets.load();
  
  server.connect();
}

function setOverlay(name) {
  if (overlay && overlays[overlay].leave) {
    overlays[overlay].leave();
  }
  
  overlay = name;
  
  overlays[overlay].enter();
  rendering.scheduleRender();
}

function clearOverlay() {
  if (overlay) {
    if (overlays[overlay].leave) {
      overlays[overlay].leave();
    }
    
    overlay = undefined;
    
    rendering.scheduleRender();
  }
}

function doUpdate(packet) {
  if (packet.state && packet.state != state) {
    if (states[state].leave) {
      states[state].leave();
    }
    
    state = packet.state;
    stateData = packet.stateData ? packet.stateData : {};
    playerStateData = packet.playerStateData ? packet.playerStateData : {};
    localStateData = {};
    
    if (packet.playerData) {
      for (let key in packet.playerData) {
        playerData[key] = packet.playerData[key];
      }
    }
    
    states[state].enter();
    rendering.scheduleRender();
  } else {
    if (packet.playerData) {
      for (let key in packet.playerData) {
        if (playerData[key] == packet.playerData[key]) {
          continue;
        }
        
        let oldValue = playerData[key];
        playerData[key] = packet.playerData[key];
        
        if (states[state].playerDataHooks && states[state].playerDataHooks[key]) {
          states[state].playerDataHooks[key](oldValue);
        }
      }
    }
    
    if (packet.stateData) {
      for (let key in packet.stateData) {
        if (stateData[key] == packet.stateData[key]) {
          continue;
        }
        
        let oldValue = stateData[key];
        stateData[key] = packet.stateData[key];
        
        if (states[state].stateDataHooks && states[state].stateDataHooks[key]) {
          states[state].stateDataHooks[key](oldValue);
        }
      }
    }
    
    if (packet.playerStateData) {
      for (let key in packet.playerStateData) {
        if (playerStateData[key] == packet.playerStateData[key]) {
          continue;
        }
        
        let oldValue = playerStateData[key];
        playerStateData[key] = packet.playerStateData[key];
        
        if (states[state].playerStateDataHooks && states[state].playerStateDataHooks[key]) {
          states[state].playerStateDataHooks[key](oldValue);
        }
      }
    }
  }
}

main();
