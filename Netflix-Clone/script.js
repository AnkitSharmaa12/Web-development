const api = "api_key=53243367ff8f50afca06cbba43dc00bf";
const base_url = "https://api.themoviedb.org/3";

const banner_url = "https://image.tmdb.org/t/p/original";
const img_url = "https://image.tmdb.org/t/p/w300";

const requests = {
    fetchTrending: `${base_url}/trending/all/week?${api}&language=en-US`,
    fetchNetflixOrignals: `${base_url}/discover/tv?${api}&with_network=213`,
    fetchActionMovies: `${base_url}/discover/movie?${api}&with_genres=28`,
    fetchComedyMovies: `${base_url}/discover/movie?${api}&with_genres=35`,
    fetchHorrorMovies: `${base_url}/discover/movie?${api}&with_genres=27`,
    fetchRomanceMovies: `${base_url}/discover/movie?${api}&with_genres=10749`,
    fetchDocumentaries: `${base_url}/discover/movie?${api}&with_genres=99`,
};

function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

// Function to fetch and display movies in a row
function fetchAndDisplayMovies(url, titleText, rowClass = "row__poster") {
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            const headrow = document.getElementById("headrow");
            const row = document.createElement("div");
            row.className = "row";
            headrow.appendChild(row);

            const title = document.createElement("h2");
            title.className = "row__title";
            title.innerText = titleText;
            row.appendChild(title);

            const row_posters = document.createElement("div");
            row_posters.className = "row__posters";
            row.appendChild(row_posters);

            data.results.forEach((movie) => {
                const poster = document.createElement("img");
                poster.className = rowClass;
                poster.id = movie.id;
                poster.src = img_url + movie.backdrop_path;
                row_posters.appendChild(poster);
            });
        })
        .catch((error) => console.error(`Error fetching ${titleText}:`, error));
}

// Fetch and display different movie categories
fetchAndDisplayMovies(requests.fetchNetflixOrignals, "NETFLIX ORIGINALS", "row__posterLarge");
fetchAndDisplayMovies(requests.fetchTrending, "Trending Now");
fetchAndDisplayMovies(requests.fetchActionMovies, "Action Movies");
fetchAndDisplayMovies(requests.fetchComedyMovies, "Comedy Movies", "row__posterLarge");
fetchAndDisplayMovies(requests.fetchHorrorMovies, "Horror Movies", "row__posterLarge");
fetchAndDisplayMovies(requests.fetchRomanceMovies, "Romance Movies");
fetchAndDisplayMovies(requests.fetchDocumentaries, "Documentaries");
