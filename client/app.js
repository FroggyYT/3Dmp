var s;

function preload() {
  s = io();
}

var scene;

function setup() {
  noCanvas();
  scene = document.getElementById("main");
  s.on("connect", (d) => {
    var box = document.createElement("a-box");
    box.setAttribute("position", "0 1 -5");
    box.setAttribute("color", "#f46842");
    box.setAttribute("id", `${d}`);
    scene.appendChild(box);
  });
}
