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

const modifyText = (command, defaultUI, value) => {
  document.execCommand(command, defaultUI, value);
};

optionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modifyText(button.id, false, null);
  });
});

advancedOptions.forEach((button) => {
  button.addEventListener("click", () => {
    modifyText(button.id, false, button.value);
  });
});

linkButton.addEventListener("click", () => {
  let userLink = prompt("Enter a URL: ");
  if (/http/i.test(userLink)) {
    modifyText(linkButton.id, false, userLink);
  } else {
    userLink = "http://" + userLink;
    modifyText(linkButton.id, false, userLink);
  }
});

const highlighter = (buttons, needsRemoval) => {
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (needsRemoval) {
        let alreadyActive = false;
        if (button.classList.contains("active")) {
          alreadyActive = true;
        }
        highlightRemover(button);
        if (!alreadyActive) {
          button.classList.add("active");
        }
      } else {
        button.classList.toggle("active");
      }
    });
  });
};

const highlightRemover = (btn) => {
  btn.forEach((button) => {
    button.classList.remove("active");
  });
};

const initializer = () => {
  highlighter(formatButtons, false);
  highlighter(alignButtons, true);
  highlighter(spaceButtons, true);
  highlighter(scriptButtons, true);

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
};

window.onload = initializer();
