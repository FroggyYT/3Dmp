var s = io();

setTimeout(() => {var scene = document.getElementById("main")},1);

s.on("connect", (d) => {
  scene.innerHTML += `<a-box position="-5 1 0" color="#FFFFF" id="${d.id}"></a-box>`;
});
