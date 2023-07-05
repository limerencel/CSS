let optNum = document.querySelectorAll(".showed");
let box = document.querySelector(".box");
let ophis = document.querySelector("#last_operation_history");
let plus_minus = document.querySelector(".plus_minus");
let operators = document.querySelectorAll(".operator");

//print all the operators and numbes into the box
function handleClick(event) {
  let output = "";
  output += event.target.innerText;
  box.innerText += output;
}

optNum.forEach(function (button) {
  button.addEventListener("click", handleClick);
});

//handle the minus sign (-)
function handleException() {
  let displayText = box.innerText;
  if (displayText === "") {
    box.innerText = "-";
  } else if (displayText === "-") {
    box.innerText = "";
  } else {
    let numbers = +box.innerText;
    if (numbers > 0) {
      box.innerText *= -1;
    } else if (numbers == 0) {
      box.innerText = 0;
    } else {
      box.innerText *= -1;
    }
  }
}

plus_minus.addEventListener("click", handleException);

//reset
function button_clear() {
  box.innerText = "";
}

//square root
function square_root() {
  let numbers = box.innerText;
  if (numbers >= 0) {
    return (box.innerText = Math.sqrt(numbers));
  } else {
    return (box.innerText = "false");
  }
}

// square
function square() {
  let numbers = box.innerText;
  return (box.innerText = Math.pow(numbers, 2));
}

//rest all including the history
function clear_entry() {
  box.innerText = "";
  ophis.innerText = "";
}

//reciprocal
function division_one() {
  let numbers = box.innerText;
  if (numbers == 0) {
    return (box.innerText = "false");
  }
  return (box.innerText = 1 / numbers);
}

//percentage
function calculate_percentage() {
  let numbers = box.innerText;
  numbers /= 100;
  box.innerText = numbers;
}

//removed button
function backspace_removed() {
  let displayText = box.innerText;
  if (displayText === "") {
    box.innerText = "";
  } else {
    box.innerText = displayText.slice(0, -1);
  }
}

//manipulate all the operations and equal signs
// function showHistory1() {
//   let displayText = box.innerText;
//   box.innerText = "";
//   ophis.innerText += displayText;
// }
// operators.forEach((button) => button.addEventListener("click", showHistory1));

//manipulate the add operators
function add() {
  let displayText = ophis.innerText;
  let result = box.innerText;
  if (displayText.includes("=")) {
    ophis.innerText = result;
    box.innerText = "";
  } else {
    ophis.innerText += result;
    box.innerText = "";
  }
  ophis.innerText += "+";
}
document.querySelector("#plusOp").addEventListener("click", add);

//same for the minus operators
function minus() {
  let displayText = ophis.innerText;
  let result = box.innerText;
  if (displayText.includes("=")) {
    ophis.innerText = result;
    box.innerText = "";
  } else {
    ophis.innerText += result;
    box.innerText = "";
  }
  ophis.innerText += "-";
}
document.querySelector("#subOp").addEventListener("click", minus);
// for multiply operators
function multiply() {
  let displayText = ophis.innerText;
  let result = box.innerText;
  if (displayText.includes("=")) {
    ophis.innerText = result;
    box.innerText = "";
  } else {
    ophis.innerText += result;
    box.innerText = "";
  }
  ophis.innerText += "×";
}
document.querySelector("#multiOp").addEventListener("click", multiply);
// for divider operators
function divider() {
  let displayText = ophis.innerText;
  let result = box.innerText;
  if (displayText.includes("=")) {
    ophis.innerText = result;
    box.innerText = "";
  } else {
    ophis.innerText += result;
    box.innerText = "";
  }
  ophis.innerText += "÷";
}
document.querySelector("#divOp").addEventListener("click", divider);

//calculate
function calculate() {
  let input = ophis.innerText + box.innerText;
  ophis.innerText += box.innerText;
  try {
    if (input.includes("×")) {
      input = input.replace("×", "*");
    }
    if (input.includes("÷")) {
      input = input.replace("÷", "/");
    }
    let result = eval(input);
    ophis.innerText += "=";
    box.innerText = result;
  } catch (e) {
    box.innerText = "Error evaluating";
  }
}
document.querySelector("#equal_sign").addEventListener("click", calculate);
