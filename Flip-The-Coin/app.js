const btn = document.querySelector("#btn");
const img = document.querySelector("#img");
const lbl = document.querySelector("#lbl");

btn.addEventListener("click", flipCoin);
img.addEventListener('click', flipCoin);

function flipCoin() {
    if (lbl.innerText === "Heads") {
        // Switch to tails
        lbl.innerText = "Tails";
        img.src = "resources/tails.svg";
    }
    else {
        // Switch to heads
        lbl.innerText = "Heads";
        img.src = "resources/heads.svg";
    }
}