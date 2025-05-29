// Get list of words and define variables
const WORDS = [
  "banana", "rocket", "yellow", "window", "castle", "doctor", "camera", "people", "mother", "forest",
  "laptop", "orange", "planet", "ticket", "animal", "hunter", "editor", "volume", "secret", "engine",
  "bucket", "shadow", "mirror", "moment", "bright", "nature", "reader", "output", "effort", "damage",
  "velvet", "marvel", "painter", "hollow", "tunnel", "wizard", "fabric", "beacon", "invite", "galaxy",
  "escape", "fossil", "magnet", "filter", "native", "sketch", "origin", "circus", "spiral", "ladder",
  "barrel", "symbol", "spirit", "danger", "rhythm", "hammer", "journey", "kingdom", "lantern", "mystery",
  "flower", "market", "packet", "silver", "energy", "motion", "sample", "format", "income", "opinion",
  "sleepy", "turtle", "cheese", "sunset", "border", "reader", "jungle", "garage", "wallet", "animal",
  "quartz", "dragon", "patrol", "beacon", "temple", "rescue", "jacket", "bricks", "drawer", "canyon",
  "pirate", "lantern", "wizard", "skater", "marvel", "velcro", "goblet", "cactus", "ribbon", "ghosts"
];

// Choose random word from list
let word = WORDS[Math.floor(Math.random() * 100)]
const scrambleWord = (w) => {
    let wCopy = [...w];
    while (JSON.stringify(w) === JSON.stringify(wCopy)) {
        for (let i = w.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [w[i], w[j]] = [w[j], w[i]];
        }
    }
    return w;
}
let scrambledWord = scrambleWord([...word]);

let currPosition = 0;
let numTries = word.length - 1;
let numMistakes = 0;

const randomBtn = document.querySelector("#random");
const resetBtn = document.querySelector("#reset");
const modalResetBtn = document.querySelector("#reset-modal");
const modal = document.querySelector(".result-modal");

let isGameOn = true;

// Display scrambled word 
function displayScrambled() {
    const input = document.querySelector(".scrambled");
    input.innerText = scrambledWord.join(" ");
}

// Display try numbers
function updateTryNumber() {
    const toAdd = document.querySelector(".num-tries > p");
    toAdd.innerText = `Tries (${numTries-numMistakes}/${numTries}):`;
}

// Create trial circles 
function displayTryCircles() {
    const toAdd = document.querySelector(".num-tries > div");
    toAdd.innerHTML = "";
    for (let i = 0; i < numTries; i++) {
        let circle = document.createElement("div");
        circle.classList.add('try', 'left');
        toAdd.append(circle);
    }
}

// Update trial circles
function updateTrialCircles() {
    let tryCircles = document.querySelectorAll("div.try");
    if (tryCircles.length - numMistakes >= 0) {
        tryCircles[tryCircles.length - numMistakes].classList.add('used');
    }
}

// Create letter boxes 
function createLetters() {
    const toAdd = document.querySelector(".guessed-letters");
    toAdd.innerHTML = "";
    for (let i = 0; i < word.length; i++) {
        let l = document.createElement('div');
        l.classList.add('letter');
        toAdd.append(l);
        
        if (i === 0) l.classList.add('focus');
    }
}

// Reset function 
function reset() {
    word = WORDS[Math.floor(Math.random() * 100)]
    scrambledWord = scrambleWord([...word]);
    currPosition = 0;
    numTries = word.length - 2;
    numMistakes = 0;
    randomBtn.disabled = false;
    randomBtn.classList.remove('disabled');
    isGameOn = true;

    displayScrambled();
    updateTryNumber();
    displayTryCircles();
    createLetters();
}

// Show and edit modal accordingly 
function displayModal(didWin) {
    const statusHeader = document.querySelector('.status-header');
    const statusBody = document.querySelector('.status-body');
    if (didWin) {
        statusHeader.innerText = "You won!";
        statusBody.innerText = "Congratuations! Click the reset button to play again.";
    }
    else {
        statusHeader.innerText = "You lost!";
        statusBody.innerText = "Click the reset button to play again.";
    }
    modal.classList.add('present');
}

// Respond to user keyboard input
window.addEventListener('keypress', (e) => {
    if (isGameOn) {
        // Check if keypress was valid 
        if (word[currPosition] === e.key) {
            // Add letter to guessed letters
            let currLetter = document.querySelectorAll('.letter')[currPosition];
            currLetter.innerText = e.key;
            currPosition += 1;
            
            // Change focus to next box
            currLetter.classList.remove('focus');
            if (currPosition < word.length) {
                document.querySelectorAll('.letter')[currPosition].classList.add('focus');
            }
        }
        else {
            console.log("Mistake made");
            numMistakes += 1;
            updateTrialCircles();
            updateTryNumber();
        }

        // Check for potential win or loss
        if (currPosition === word.length) {
            console.log("You won!")
            isGameOn = false;
            randomBtn.disabled = true;
            randomBtn.classList.add('disabled');
            displayModal(true);
        }
        else if (numMistakes === numTries) {
            console.log("You lost!");
            isGameOn = false;
            randomBtn.disabled = true;
            randomBtn.classList.add('disabled');
            displayModal(false);
        }
    }
})

// Respond to randomize letter button 
randomBtn.addEventListener('click', () => {
    scrambledWord = scrambleWord([...word]);
    displayScrambled();
})

// Respond to reset button
resetBtn.addEventListener('click', reset);

// Respond to modal reset button 
modalResetBtn.addEventListener('click', () => {
    modal.classList.remove('present');
    reset();
})

// Start game
displayScrambled();
updateTryNumber();
displayTryCircles();
createLetters();