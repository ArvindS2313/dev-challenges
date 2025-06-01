// Calling the API
const API_KEY = "4be5a34a";
const getData = async (movie) => {
    try {
        let result = await axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&t=${movie}`);
        if (result.data.Response === "True") {
            return {
                name: result.data.Title,
                genre: result.data.Genre,
                desc: result.data.Plot,
                directors: result.data.Director,
                writers: result.data.Writer,
                stars: result.data.Actors,
                rating: result.data.Ratings[0].Value,
                numVotes: result.data.imdbVotes,
                poster: result.data.Poster
            }
        }
        else {
            return {};
        }
    }
    catch {
        return {};
    }
}

// DOM Manipulation 
const html = {
    input: document.querySelector("#input"),
    main: document.querySelector("main"),
    divPoster: document.querySelector(".poster"),
    h1: document.querySelector(".content h1"),
    icons: document.querySelector(".icons"),
    description: document.querySelector(".description"),
    directors: document.querySelector("#directors"),
    writers: document.querySelector("#writers"),
    stars: document.querySelector("#stars"),
    rating: document.querySelector("#rating"),
    warning: document.querySelector(".warning h1")
}

html.input.addEventListener('change', () => {
    displayMovieInfo(html.input.value);
});

async function displayMovieInfo(movieName) {
    // Reset current HTML
    reset();

    let data = await getData(movieName);
    console.log(data);

    // Check if data is empty
    if (Object.keys(data).length === 0) {
        html.warning.classList.remove("hidden");
        html.warning.innerText = "Please enter a valid movie!";
        return;
    }
    
    // Display poster
    const imgPoster = document.createElement("img");
    imgPoster.src = data.poster;
    imgPoster.width = "200";
    imgPoster.height = "300";
    imgPoster.append(html.imgPoster);
    html.divPoster.append(imgPoster);

    // Display title 
    html.h1.innerText = data.name;

    // Display icons
    let genres = data.genre.split(", ");
    for (let genre of genres) {
        let icon = document.createElement("div");
        icon.classList.add("icon");
        icon.append(genre);
        html.icons.append(icon);
    }

    // Display description
    let p = document.createElement("p");
    p.innerText = data.desc;
    html.description.append(p);

    // Display attributes
    for (let a of ["Directors", "Writers", "Stars", "Rating"]) {
        p = document.createElement("p");
        let lbl = document.createElement("span");
        lbl.classList.add("lbl");

        lbl.innerText = a + ": ";
        p.append(lbl, data[a.toLowerCase()]);

        if (a === "Rating") {
            let votes = document.createElement("span");
            votes.id = "num-ratings";
            votes.innerText = ` (${data.numVotes})`;
            p.append(votes);
        }

        html[a.toLowerCase()].append(p);
    }

    // Show main & border
    html.main.classList.add("main-border");
}

function reset() {
    for (let e of Object.keys(html)) {
        if (e !== "main") {
            html[e].innerHTML = "";
        }
    }
    html.main.classList.remove("main-border");
}