var s;

function preload() {
  s = io();
}

var scene;

function setup() {
  scene = document.getElementById("main");
  s.on("connect", (d) => {
    scene.innerHTML += `<a-box position="-5 1 0" color="#f46842" id="${d}"></a-box>`;
  });
}
