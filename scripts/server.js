const server = {};

server.NOT_CONNECTED = 0;
server.HANDSHAKE = 1;
server.CONNECTED = 2;
server.OUT_OF_DATE = 3;

server.url = localStorage.serverURL ? localStorage.serverURL : "wss://server-eu.partyblitz.xyz:6256";
server.socket = undefined;
server.state = server.NOT_CONNECTED;
server.sessionID = "";
server.reconnecting = false;

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
      
      this.socket.send(JSON.stringify({
        type: "newSession"
      }));
    break;
    case "session":
      this.sessionID = packet.id;
      this.state = this.CONNECTED;
    break;
  }
};

server.connect = function () {
  this.socket = new WebSocket(this.url);
  this.state = this.HANDSHAKE;
  
  this.socket.addEventListener("message", (e) => {
    let packet = JSON.parse(e.data);
    
    switch (this.state) {
      case this.HANDSHAKE:
        server.handleHandshakePacket(packet);
      break;
    }
  });
};
