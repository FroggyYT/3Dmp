var s;
var scene;
var myId;
var playerContainer;

window.mobilecheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

function preload() {
  s = io();
}

function setup() {
  noCanvas();

  if (/*window.mobilecheck()*/true) {
    document.body.addEventListener("touchstart", () => {
      var directions = document.getElementById("camera").components.camera.camera.getWorldDirection().multiplyScalar(0.5);
      document.getElementById("camera").components.camera.camera.parent.position.add({x:directions.x, y:0, z:directions.z});
    });
  }

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
    document.getElementById(d.id + "head").setAttribute("rotation", {x:d.rot.x, y:d.rot.y, z:d.rot.z});
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
