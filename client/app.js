setTimeout(() => {
  var scene = document.getElementById("main")
  var s = io();
  s.on("connect", (d) => {
    scene.innerHTML += `<a-box position="-5 1 0" color="#FFFFF" id="${d.id}"></a-box>`;
  });
},1);
