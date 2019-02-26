var s;

function preload() {
  s = io();
}

var scene;

function setup() {
  noCanvas();
  scene = document.getElementById("main");
  s.on("connect", (d) => {
    var box = document.createElement("a-box")
      .setAttribute("position", "0 1 -5")
      .setAttribute("color", "#f46842")
      .setAttribute("id", `${d}`);
    scene.appendChild(box);
  });
}
