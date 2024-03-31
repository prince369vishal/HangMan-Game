const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-box img ");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const gameModal = document.querySelector(".game-modal");
const playAgain = document.querySelector(".play-again")

let currentWord,
  correctWord=[],
  wrongGuessCount
const maxGuess = 6;

function resetGame(){
  correctWord = [],
  wrongGuessCount = 0;
  wordDisplay.innerHTML = currentWord
  .split("")
  .map(() => `<li class="letter"></li>`)
  .join("");
  hangmanImage.src = `images\ 10/hangman-${wrongGuessCount}.svg`;
  guessesText.innerText = `${wrongGuessCount}/ ${maxGuess}`;
  gameModal.classList.remove('show');

}
  
const getRandomWords = () => {
  const { keyword, hint } =
    wordLists[Math.floor(Math.random() * wordLists.length)];
  currentWord = keyword;
  document.querySelector(".hint-text b").innerText =` Its a ${keyword.length} letter word.`;
  document.querySelector(".hint-des b").innerText = hint;
  resetGame();
 
};

const gameOver = (isVictory)=>{
  setTimeout(()=>{
    const modalText = isVictory?`You found the word:` : `The correct word is:`
    gameModal.querySelector("img").src = `images\ 10/${isVictory? `victory` : `lost`}.gif`
    gameModal.querySelector("h4").innerText = `${isVictory? `You Won!` : `You lost!`}`
    gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`
    gameModal.classList.add("show")
  },500);

}

const initGame = (button, clickedLetter) => {
  if (currentWord.includes(clickedLetter)) {
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        correctWord.push(letter);
        wordDisplay.querySelectorAll("li")[index].innerText = letter;
        wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
      }
    });
  } else {
    wrongGuessCount++;
    hangmanImage.src = `images\ 10/hangman-${wrongGuessCount}.svg`;
  }

  guessesText.innerText = `${wrongGuessCount}/ ${maxGuess}`;

  if (wrongGuessCount === maxGuess) return gameOver(false);
  if (correctWord.length === currentWord.length) return gameOver(true);
 };

for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  keyboardDiv.appendChild(button);
  button.addEventListener("click", (e) => {
    initGame(e.target, String.fromCharCode(i));
  });
}

getRandomWords();

playAgain.addEventListener("click", getRandomWords);