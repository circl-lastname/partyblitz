var playerData = {};
var state = "loadingScreen";
var stateData = {};
var playerStateData = {};
var localStateData = {};

async function main() {
  let font = new FontFace("Grandstander", "url(assets/fonts/Grandstander.ttf)");
  document.fonts.add(font);
  await font.load();
  
  rendering.init();
  states[state].enter();
  rendering.scheduleRender();
  
  assets.load(() => {
    server.connect();
  });
}

function doUpdate(packet) {
  let init = false;
  
  if (packet.state) {
    if (states[state].leave) {
      states[state].leave();
    }
    
    state = packet.state;
    stateData = {};
    playerStateData = {};
    localStateData = {};
    
    if (states[state].enter) {
      states[state].enter();
    }
    
    rendering.scheduleRender();
    
    init = true;
  }
  
  if (packet.playerData) {
    for (let key in packet.playerData) {
      let oldValue = playerData[key];
      playerData[key] = packet.playerData[key];
      
      if (states[state].playerDataHooks && states[state].playerDataHooks[key]) {
        states[state].playerDataHooks[key](oldValue, init);
      }
    }
  }
  
  if (packet.stateData) {
    for (let key in packet.stateData) {
      let oldValue = stateData[key];
      stateData[key] = packet.stateData[key];
      
      if (states[state].stateDataHooks && states[state].stateDataHooks[key]) {
        states[state].stateDataHooks[key](oldValue, init);
      }
    }
  }
  
  if (packet.playerStateData) {
    for (let key in packet.playerStateData) {
      let oldValue = playerStateData[key];
      playerStateData[key] = packet.playerStateData[key];
      
      if (states[state].playerStateDataHooks && states[state].playerStateDataHooks[key]) {
        states[state].playerStateDataHooks[key](oldValue, init);
      }
    }
  }
}

main();
