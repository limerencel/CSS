let optionButtons = document.querySelectorAll(".option-btn");
let advancedOptions = document.querySelectorAll(".adv-option-button");
let fontName = document.getElementById("fontName");
let fontSize = document.getElementById("fontSize");
let writingArea = document.getElementById("text-input");
let linkButton = document.getElementById("createLink");
let alignButtons = document.querySelectorAll(".align");
let spaceButtons = document.querySelectorAll(".spacing");
let formatButtons = document.querySelectorAll(".format");
let scriptButtons = document.querySelectorAll(".script");

let fontList = [
  "Arial",
  "Verdana",
  "Garamond",
  "Times New Roman",
  "Georgia",
  "Courier New",
  "Cursive",
];

fontList.map((value) => {
  let option = document.createElement("option");
  option.value = value;
  option.innerHTML = value;
  fontName.appendChild(option);
});

for (let i = 0; i < 8; i++) {
  let option = document.createElement("option");
  option.value = i;
  option.innerHTML = i;
  fontSize.appendChild(option);
}
fontSize.value = 3;

function handleClick(button, command, defaultUI, value) {
  button.addEventListener("click", () => {
    if (button.classList.contains("active")) {
      removeFormatting(button.id);
      button.classList.remove("active");
    } else {
      document.execCommand(command, defaultUI, value);
      button.classList.add("active");
    }
  });
}

optionButtons.forEach((button) => {
  handleClick(button, button.id, false, null);
});

advancedOptions.forEach((button) => {
  button.addEventListener("change", () => {
    document.execCommand(button.id, false, button.value);
  });
});

linkButton.addEventListener("click", () => {
  let userLink = prompt("Enter a URL: ");
  if (/http/i.test(userLink)) {
    document.execCommand(linkButton.id, false, userLink);
  } else {
    userLink = "http://" + userLink;
    document.execCommand(linkButton.id, false, userLink);
  }
});

function removeFormatting(command) {
  console.log("wd");
  if (command === "bold") {
    document.execCommand("removeFormat", false, null);
    document.execCommand("bold", false, null);
  }
}
