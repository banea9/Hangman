const playBtn = document.getElementById("playBtn");
const notification = document.getElementById("notification-container");
const popup = document.getElementById("popup-container");
const wrongLetter = document.getElementById("wrong-letters");
const word = document.getElementById("word");
const message = document.getElementById("message");
const figureParts = document.querySelectorAll(".figure-part");

const wordsDB = [
  "application",
  "wizard",
  "programming",
  "testing",
  "interface",
  "react"
];
let playable = true;
let selectedWord = wordsDB[Math.floor(Math.random() * wordsDB.length)];
let correctLetters = [];
let wrongLetters = [];

function displayWord() {
  word.innerHTML = `${selectedWord
    .split("")
    .map(
      letter =>
        `<span class="letter">
        ${correctLetters.includes(letter) ? letter : ""}
        </span>`
    )
    .join("")}`;

  const innerWord = word.innerText.replace(/\n/g, "");

  if (innerWord === selectedWord) {
    message.innerText = "Congratulations! You have won 😃";
    popup.style.display = "flex";
    playable = false;
  }
}

function updateWrongLettersElement() {
  //show wrong letters
  wrongLetter.innerHTML = `
        ${wrongLetters.length > 0 ? "<p>Wrong:</p>" : ""}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;
  // display hangman parts
  figureParts.forEach((part, index) => {
    let errors = wrongLetters.length;
    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });
  //popup appeat
  if (wrongLetters.length === figureParts.length) {
    message.innerText = "Sorry, you lost! 😕 ";
    popup.style.display = "flex";
    playable = false;
  }
}

function showNotification() {
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 2500);
}

window.addEventListener("keydown", function(event) {
  if (playable) {
    if (event.keyCode >= 65 && event.keyCode <= 90) {
      const letter = event.key;
      if (selectedWord.includes(letter)) {
        if (!correctLetters.includes(letter)) {
          correctLetters.push(letter);
          displayWord();
        } else {
          showNotification();
        }
      } else {
        if (!wrongLetters.includes(letter)) {
          wrongLetters.push(letter);
          updateWrongLettersElement();
        } else {
          showNotification();
        }
      }
    }
  }
});

//restart the game
playBtn.addEventListener("click", function() {
  playable = true;
  correctLetters.splice(0);
  wrongLetters.splice(0);
  selectedWord = wordsDB[Math.floor(Math.random() * wordsDB.length)];
  displayWord();

  updateWrongLettersElement();

  popup.style.display = "none";

  // word.innerHTML = ``;
});

displayWord();
