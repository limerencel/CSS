let container = document.querySelector(".container");
let widthRange = document.getElementById("width-range");
let heightRange = document.getElementById("height-range");
let selectColor = document.querySelector("#color-input");
let createBtn = document.getElementById("createGrid");
let clearBtn = document.getElementById("clearGrid");
let eraseBtn = document.getElementById("eraseGrid");
let paintBtn = document.getElementById("paintGrid");
let widthValue = document.getElementById("width-value");
let heightValue = document.getElementById("height-value");

let events = {
  mouse: {
    down: "mousedown",
    move: "mousemove",
    up: "mouseup",
  },
  touch: {
    down: "touchstart",
    mobe: "touchmove",
    up: "touchend",
  },
};

let deviceType = "";
let draw = false;
let erase = false;

const isTouchDevice = () => {
  try {
    document.createEvent("TouchEvent");
    deviceType = "touch";
    return true;
  } catch (e) {
    deviceType = "mouse";
    return false;
  }
};

isTouchDevice();

createBtn.addEventListener("click", () => {
  container.innerHTML = "";
  let count = 0;
  for (let i = 0; i < heightRange.value; i++) {
    let div = document.createElement("div");
    div.classList.add("gridRow");
    for (let j = 0; j < widthRange.value; j++) {
      count += 2;
      let col = document.createElement("div");
      col.classList.add("gridCol");
      col.setAttribute("id", `gridCol${count}`);
      div.appendChild(col);
    }
    container.appendChild(div);
  }
});

function handleDrawing(e) {
  if (erase) {
    e.target.style.backgroundColor = "transparent";
  } else {
    e.target.style.backgroundColor = selectColor.value;
  }
}

container.addEventListener(events[deviceType].down, (e) => {
  if (!e.target.classList.contains("gridCol")) return;

  console.log("clicked");

  draw = true;
  handleDrawing(e);
});

container.addEventListener(events[deviceType].move, (e) => {
  if (!e.target.classList.contains("gridCol")) return;

  if (draw) {
    handleDrawing(e);
  }
});

container.addEventListener(events[deviceType].up, () => {
  draw = false;
});

clearBtn.addEventListener("click", () => {
  container.innerHTML = "";
});

eraseBtn.addEventListener("click", () => (erase = true));

paintBtn.addEventListener("click", () => (erase = false));

widthRange.addEventListener("input", () => {
  widthValue.innerHTML =
    widthRange.value < 9 ? `0${widthRange.value}` : widthRange.value;
});

heightRange.addEventListener("input", () => {
  heightValue.innerHTML =
    heightRange.value < 9 ? `0${heightRange.value}` : heightRange.value;
});

window.onload = () => {
  widthRange.value = 0;
  heightRange.value = 0;
};
