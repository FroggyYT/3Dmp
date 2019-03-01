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

          var body = document.createElement("a-box");
          body.id = socket;
          body.setAttribute("position", "0, 0, -5");
          body.setAttribute("scale", "1 2 0.5");
          body.setAttribute("color", "#41f488");

          var head = document.createElement("a-box");
          head.id = socket + "head";
          head.setAttribute("position", "0, 2, 0");
          head.setAttribute("scale", "1 1 1");
          head.setAttribute("color", "#f4bc42");

          var leftArm = document.createElement("a-box");
          leftArm.id = socket + "leftArm";
          leftArm.setAttribute("position", "-0.75, 0.25, 0");
          leftArm.setAttribute("scale", "0.5 0.5 1");
          leftArm.setAttribute("color", "#f4bc42");

          var rightArm = document.createElement("a-box");
          rightArm.id = socket + "rightArm";
          rightArm.setAttribute("position", "0.75, 0.25, 0");
          rightArm.setAttribute("scale", "0.5 0.5 1");
          rightArm.setAttribute("color", "#f4bc42");

          body.appendChild(leftArm);
          body.appendChild(rightArm);
          playerContainer.appendChild(body);
          playerContainer.appendChild(head);
        }
    }
  });

  s.on("move", (d) => {
    document.getElementById(d.id).setAttribute("position", d.pos);
    document.getElementById(d.id + "head").setAttribute("position", {x:d.pos.x, y:d.pos.y + 1.5, z:d.pos.z});
    document.getElementById(d.id).setAttribute("rotation", {x:0, y:d.rot.y, z:0});
    document.getElementById(d.id + "head").setAttribute("rotation", {x:d.rot.x, y:d.rot.y, z:0});
  });
}

function draw() {
  //
}

var keyDown = true;

setInterval(() => {
  if (keyDown) {
    var po = document.getElementById("camera").object3D.position;
    var ro = document.getElementById("camera").getAttribute("rotation");
    s.emit("move", {id:myId, pos:{x:po.x,y:po.y - 1.6,z:po.z}, rot:{x:ro.x,y:ro.y,z:ro.z}});
  }
},1);
