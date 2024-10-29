const server = {};

server.NOT_CONNECTED = 0;
server.HANDSHAKE = 1;
server.CONNECTED = 2;
server.DISABLED = 3;

server.url = localStorage.serverURL ? localStorage.serverURL : "wss://server-eu.partyblitz.xyz:6256";
server.socket = undefined;
server.state = server.NOT_CONNECTED;
server.sessionID = localStorage.sessionID;
server.reconnectAttempts = 0;

server.handleHandshakePacket = function (packet) {
  switch (packet.type) {
    case "handshake":
      if (packet.protocolVersion != 1) {
        this.state = this.OUT_OF_DATE;
        this.socket.close();
        this.socket = undefined;
        return;
      }
      
      console.log(`Connected to "${packet.name}"`);
      
      this.reconnectAttempts = 0;
      
      if (this.sessionID) {
        this.socket.send(JSON.stringify({
          type: "resumeSession",
          id: this.sessionID
        }));
      } else {
        this.socket.send(JSON.stringify({
          type: "newSession"
        }));
      }
    break;
    case "session":
      this.sessionID = packet.id;
      localStorage.sessionID = packet.id;
      this.state = this.CONNECTED;
    break;
  }
};

server.connect = function () {
  if (this.state == this.DISABLED) {
    console.log("Refusing to connect to server");
    return;
  }
  
  this.socket = new WebSocket(this.url);
  this.state = this.HANDSHAKE;
  
  this.socket.addEventListener("message", (e) => {
    let packet = JSON.parse(e.data);
    
    switch (this.state) {
      case this.HANDSHAKE:
        this.handleHandshakePacket(packet);
      break;
    }
  });
  
  this.socket.addEventListener("close", (e) => {
    switch (this.state) {
      case this.HANDSHAKE:
      case this.CONNECTED:
        this.socket = undefined;
        
        if (this.reconnectAttempts < 20) {
          this.reconnectAttempts++;
          this.connect();
        } else {
          this.state = this.DISABLED;
          console.log(`Server reconnection failed after ${this.reconnectAttempts} attempts`)
        }
      break;
    }
  });
};
