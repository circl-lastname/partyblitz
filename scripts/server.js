const server = {};

server.NOT_CONNECTED = 0;
server.HANDSHAKE = 1;
server.CONNECTED = 2;
server.DISABLED = 3;

server.url = localStorage.serverURL ? localStorage.serverURL : "wss://server-eu.partyblitz.xyz:6256";
server.socket = undefined;
server.reconnectAttempts = 0;

server.state = server.NOT_CONNECTED;
server.sessionID = localStorage.sessionID;
server.keepAliveInterval = undefined;

server.handleHandshakePacket = function (packet) {
  switch (packet.type) {
    case "handshake": {
      if (packet.protocolVersion != 1) {
        this.state = this.DISABLED;
        this.socket.close();
        
        doUpdate({
          state: "errorScreen",
          stateData: {
            error: locale.errorOutOfDate,
            description: locale.errorDescOutOfDate
          }
        });
        return;
      }
      
      console.log(`Connected to "${packet.name}"`);
      
      this.reconnectAttempts = 0;
      
      if (overlay == "reconnecting") {
        clearOverlay();
      }
      
      let response;
      
      if (this.sessionID) {
        response = {
          type: "resumeSession",
          id: this.sessionID
        };
      } else {
        response = {
          type: "newSession"
        };
      }
      
      if (localStorage.username) {
        response.username = localStorage.username;
      }
      
      this.socket.send(JSON.stringify(response));
    } break;
    case "session":
      this.sessionID = packet.id;
      localStorage.sessionID = packet.id;
      this.state = this.CONNECTED;
    break;
  }
};

server.handlePacket = function (packet) {
  switch (packet.type) {
    case "disable":
      this.state = this.DISABLED;
      
      doUpdate({
        state: "errorScreen",
        stateData: {
          error: locale.errorDisabled,
          description: locale.errorDescDisabled
        }
      });
    break;
    case "update":
      doUpdate(packet);
    break;
  }
};

server.call = function (name, argument) {
  this.socket.send(JSON.stringify({
    type: "call",
    state: state,
    name: name,
    argument: argument
  }));
};

server.connect = function () {
  if (this.state == this.DISABLED) {
    console.log("Refusing to connect to server");
    return;
  }
  
  this.socket = new WebSocket(this.url);
  this.state = this.HANDSHAKE;
  
  this.socket.addEventListener("open", () => {
    this.keepAliveInterval = setInterval(() => {
      this.socket.send(JSON.stringify({
        type: "keepAlive"
      }));
    }, 60*1000);
  });
  
  this.socket.addEventListener("message", (e) => {
    let packet = JSON.parse(e.data);
    
    switch (this.state) {
      case this.HANDSHAKE:
        this.handleHandshakePacket(packet);
      break;
      case this.CONNECTED:
        this.handlePacket(packet);
      break;
    }
  });
  
  this.socket.addEventListener("close", () => {
    clearInterval(this.keepAliveInterval);
    this.socket = undefined;
    
    if (this.state == this.HANDSHAKE || this.state == this.CONNECTED) {
      if (this.reconnectAttempts < 20) {
        if (this.state == this.CONNECTED && overlay != "reconnecting") {
          setOverlay("reconnecting");
        }
        
        this.reconnectAttempts++;
        this.connect();
      } else {
        this.state = this.DISABLED;
        console.log(`Server reconnection failed after ${this.reconnectAttempts} attempts`);
        
        clearOverlay();
        
        doUpdate({
          state: "errorScreen",
          stateData: {
            error: locale.errorFailedReconnect,
            description: locale.errorDescFailedReconnect
          }
        });
      }
    }
  });
};
