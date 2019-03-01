var express = require("express");
var app = express();
var server = require("http").Server(app);

app.get("/", function(req, res) { res.sendFile(__dirname + "/client/index.html"); });

app.use("/client", express.static(__dirname + "/client"));

server.listen(process.env.PORT || 2000);

var io = require("socket.io")(server,{});

var SOCKETS = [];

io.on("connection", (s) => {
  SOCKETS.push(s.id);

  s.emit("TransferID", s.id);

  io.emit("updateSockets", SOCKETS);

  s.on("move", (d) => {
    s.broadcast.emit("move", d);
  });

  s.on("disconnect", () => {
    for (var i in SOCKETS) {
      if (SOCKETS[i] == s.id) {
        SOCKETS.splice(i, 1);
        io.emit("updateSockets", SOCKETS);
      }
    }
  });
});
