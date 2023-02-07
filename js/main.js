const text1 = document.querySelector(".text1");
const input1 = document.querySelector(".input1");
const score = document.querySelector(".score");
const time = document.querySelector(".time");
const modal = document.querySelector(".modal");
const text3 = document.querySelector(".text3");
const btn5 = document.querySelector(".btn5");
const HightScore = document.querySelector(".HightScore");
const levelEl = document.getElementById("level");

let num = 0;
let timer = 10;
let level = localStorage.getItem("level")
  ? localStorage.getItem("level")
  : "Medium";
let hightscore = localStorage.getItem("hightscore")
  ? localStorage.getItem("hightscore")
  : 0;
let word;

const api = "https://random-word-api.herokuapp.com/word";

function randomNewWord(api) {
  fetch(api)
    .then((data) => {
      return data.json();
    })
    .then(getWords);
  function getWords(data) {
    console.log(data);;
    let newWord = data[0].toLowerCase();
    word = newWord;
    text1.textContent = word;
  }
}

randomNewWord(api);

levelEl.value = localStorage.getItem("level");

// events
input1.addEventListener("input", checkWord);
levelEl.addEventListener("change", changeLevel);

function checkWord() {
  if (input1.value == text1.textContent) {
    randomNewWord(api);

    input1.value = "";
    num++;
    score.textContent = `score: ${num}`;

    if (level == "Easy") {
      timer += 5;
      time.textContent += "+5";
    } else if (level == "Medium") {
      timer += 3;
      time.textContent += "+3";
    } else if (level == "Hard") {
      timer += 2;
      time.textContent += "+2";
    }

    if (num >= hightscore) {
      hightscore = num;
    } else if (num < hightscore) {
      hightscore = hightscore;
    }
  }
}

const counter = setInterval(() => {
  if (timer > 0) {
    timer--;
    time.textContent = `time: ${timer}`;
  } else if (timer == 0) {
    modal.style.display = "block";
    text3.textContent = `your result: ${num}`;
    clearInterval(counter);

    hScore();
  }
}, 1000);
HightScore.textContent = `HightScore: ${hightscore}`;

// changeLevel

function changeLevel() {
  localStorage.setItem("level", levelEl.value);
  level = levelEl.value;
}

function hScore() {
  localStorage.setItem("hightscore", num);
  hightscore = num;
}

window.addEventListener("contextmenu", (event) => event.preventDefault());
  window.document.onkeydown = function (e) {
    if (
      e.ctrlKey &&
      (e.keyCode === 67 ,
        e.keyCode === 86 ,
        e.keyCode === 85 ||
        e.keyCode === 117)
    ) {
      return false;
    } else {
      return true;
    }
  };
