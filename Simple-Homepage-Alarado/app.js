const hamburger = document.querySelector("#hamburger");
hamburger.addEventListener('click', () => {
    const links = document.querySelectorAll(".links");
    for (let l of links) {
        l.classList.toggle('off');
    }
    
})
