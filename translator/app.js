import countries from "./countries.js";

const fromText = document.getElementById("fromtext");
const output = document.getElementById("output");
const selectTag = document.querySelectorAll("select");
const translateBtn = document.querySelector(".translateBtn");
const exchangeBtn = document.querySelector(".exchange");
const copyLeftBtn = document.querySelector(".copy-left");
const copyRightBtn = document.querySelector(".copy-right");
const playLeftSound = document.querySelector(".play-left");
const playRightSound = document.querySelector(".play-right");

let key = "8c185e13ac96480ef495";
let fromLang = selectTag[0].value;
let resultLang = selectTag[1].value;
// get the key and process it
function getKey(obj, value) {
  const entry = Object.entries(obj).find(([key, val]) => val === value);
  return entry ? entry[0].split("-")[0] : null;
}

function getLang() {
  selectTag[0].addEventListener("change", (e) => {
    fromLang = e.target.value;
    if (Object.values(countries).includes(fromLang)) {
      getKey(countries, fromLang);
    }
  });

  selectTag[1].addEventListener("change", (e) => {
    resultLang = e.target.value;
    if (Object.values(countries).includes(resultLang)) {
      getKey(countries, resultLang);
    }
  });
}
getLang();

translateBtn.addEventListener("click", () => {
  let query = fromText.value;
  const url = `https://api.mymemory.translated.net/get?q=${query}%&key=${key}&langpair=${fromLang}|${resultLang}`;
  if (query) {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("something wrong");
        }
        return response.json();
      })
      .then((data) => {
        console.log(fromLang);
        console.log(resultLang);
        output.value = data["responseData"]["translatedText"];
      })
      .catch((e) => console.log("Error: ", e));
  } else {
    output.value = "Please insert text";
  }
});

exchangeBtn.addEventListener("click", () => {
  const selectedIndexLeft = selectTag[0].selectedIndex;
  const selectedIndexRight = selectTag[1].selectedIndex;

  selectTag[0].selectedIndex = selectedIndexRight;
  selectTag[1].selectedIndex = selectedIndexLeft;
  fromLang = selectTag[0].value;
  resultLang = selectTag[1].value;
  // console.log(selectTag[0][selectedIndexRight]);
});

copyLeftBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(fromText.value).then(
    () => {
      alert("Successfully copied");
    },
    () => {
      alert("Something wrong");
    }
  );
});
copyRightBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(output.value).then(
    () => {
      alert("Successfully copied");
    },
    () => {
      alert("Something wrong");
    }
  );
});
playLeftSound.addEventListener("click", () => {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(fromText.value);
  synth.speak(utterance);
});
playRightSound.addEventListener("click", () => {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(output.value);
  synth.speak(utterance);
});
