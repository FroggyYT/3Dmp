var s;
var scene;
var myId;
var playerContainer;

function preload() {
  s = io();
}

function setup() {
  noCanvas();

  playerContainer = document.getElementById("player-container");

  s.on("TransferID", (d) => {
    myId = d;
  });

  s.on("updateSockets", (d) => {
    playerContainer.innerHTML = "";
    for (socket of d) {
        if (socket != myId) {
        var box = document.createElement("a-box");
        box.id = socket;
        box.setAttribute("position", "0, 0, -5");
        var face = document.createElement("a-box");
        face.id = socket + "face";
        face.setAttribute("position", "0, 1, 0");
        box.appendChild(face);
        playerContainer.appendChild(box);
      }
    }
  });

  s.on("move", (d) => {
    document.getElementById(d.id).setAttribute("position", d.pos);
    document.getElementById(d.id + "face").setAttribute("rotation", d.rot);
  });
}

var m = 0;
var orX = 0;
var orZ = 0;

function draw() {
  //
}

var keyDown = true;

setInterval(() => {
  if (keyDown) {
    var po = document.getElementById("camera").object3D.position;
    var ro = document.getElementById("camera").getAttribute("rotation");
    s.emit("move", {id:myId, pos:{x:po.x,y:po.y - 1.6,z:po.z}, rot:ro});
  }
},1);
