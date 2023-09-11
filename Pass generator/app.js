let passwordArea = document.getElementById("generatePwd");
let copyButton = document.getElementById("copy");
let length = document.getElementById("length");
let lowercaseButton = document.getElementById("lowercase");
let uppercaseButton = document.getElementById("uppercase");
let numbersButton = document.getElementById("numbers");
let symbolsButton = document.getElementById("sysmbols");
let duplicateButton = document.getElementById("duplicate");
let spacesButton = document.getElementById("spaces");
let generateButton = document.getElementById("generateBtn");
let lengthValue = document.getElementById("pwdLength");

const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!$%&|[](){}:;.,*+-#@<>~",
};

function generatePassword(Pwdlength) {
  let includeLowercase = lowercaseButton.checked;
  let includeUppercase = uppercaseButton.checked;
  let includeNumbers = numbersButton.checked;
  let includeSymbols = symbolsButton.checked;
  let excludeDuplicates = duplicateButton.checked;
  let inculdeSpaces = spacesButton.checked;

  let validCharacters = "";
  if (includeLowercase) {
    validCharacters += characters["lowercase"];
  }
  if (includeUppercase) {
    validCharacters += characters["uppercase"];
  }
  if (includeNumbers) {
    validCharacters += characters["numbers"];
  }
  if (includeSymbols) {
    validCharacters += characters["symbols"];
  }
  if (inculdeSpaces) {
    validCharacters += " ";
  }

  if (validCharacters === "") {
    alert("Please select the options properly");
    return "";
  }

  if (excludeDuplicates) {
    if (Pwdlength > validCharacters.length) {
      window.alert("There aren't enough unique characters");
      return "";
    } else {
      validCharacters = validCharacters.split("");
      for (let i = validCharacters.length; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [validCharacters[i], validCharacters[j]] = [
          validCharacters[j],
          validCharacters[i],
        ];
      }
      return validCharacters.slice(0, Pwdlength).join("");
    }
  } else {
    let password = "";
    for (let i = 0; i < Pwdlength; i++) {
      let random = Math.floor(Math.random() * validCharacters.length);
      password += validCharacters[random];
    }
    return password;
  }
}

length.addEventListener("input", () => {
  lengthValue.innerHTML = length.value;
});

generateButton.addEventListener("click", () => {
  let password = generatePassword(length.value);
  passwordArea.value = password;
});

copyButton.addEventListener("click", () => {
  passwordArea.select();
  try {
    if (passwordArea.value) {
      document.execCommand("copy");
      alert("Password copied");
    } else if (passwordArea.value === "") {
      alert("there is no password to be copied");
    }
  } catch (e) {
    alert("It seems something went wrong. " + e);
  }
  passwordArea.setSelectionRange(0, 0);
});
