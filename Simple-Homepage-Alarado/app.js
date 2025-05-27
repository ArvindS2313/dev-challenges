const hamburger = document.querySelector("#hamburger");
hamburger.addEventListener('click', () => {
    const links = document.querySelectorAll(".links");
    for (let l of links) {
        l.classList.toggle('off');
    }
})

const toggle = document.querySelector("#checkbox");
toggle.addEventListener('click', () => {
    // Set link colors
    const content = document.querySelector(".content");
    const subtext = document.querySelector(".subtext");
    const getLiveDemo = document.querySelector(".get-live-demo");
    const perks = document.querySelector(".perks");
    const links = document.querySelectorAll("a");
    for (let e of [content, subtext, getLiveDemo, perks, ...links]) {
        e.classList.toggle('dark');
    }

    // Set background color
    document.body.classList.toggle('bg-black');
    for (let e of document.querySelectorAll("nav .links")) {
        e.classList.toggle('bg-black');
    }

    // Set logo image
    const img = document.querySelector("img")
    if (img.src.endsWith("resources/logo-dark.svg")) {
        img.src = "resources/logo-light.svg";
    }
    else if (img.src.endsWith("resources/logo-light.svg")) {
        img.src = "resources/logo-dark.svg";
    }
})