
document.getElementById("search-bar").addEventListener("input", debounce(searchMovies, 500));
document.getElementById("search-button").addEventListener("click", searchMovies);

function searchMovies() {
    var searchTerm = document.getElementById("search-bar").value;
    if (searchTerm.trim() === "") {
        document.getElementById("search-results").innerHTML = "";
        return;
    }

    var apiKey = '587b4d33'; // Replace with your actual API key
    var apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.Response === "True") {
                displaySearchResults(data.Search);
            } else {
                document.getElementById("search-results").innerHTML = "<p>No results found</p>";
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displaySearchResults(results) {
    var searchResultsDiv = document.getElementById("search-results");
    searchResultsDiv.innerHTML = "";

    results.forEach(movie => {
        var movieInfoDiv = document.createElement("div");
        movieInfoDiv.className = "movie-info";

        var imageElement = document.createElement("img");
        imageElement.src = movie.Poster;
        imageElement.alt = movie.Title;
        imageElement.style.width = "100%";
        imageElement.style.height = "100%";
        imageElement.style.margin = "0px";

        var titleElement = document.createElement("p");
        titleElement.textContent = movie.Title;
        titleElement.style.textAlign= "center";

        movieInfoDiv.appendChild(imageElement);
        movieInfoDiv.appendChild(titleElement);

        movieInfoDiv.addEventListener("click", function () {
            // Redirect to next.html with movie details as a query parameter
            var movieId = encodeURIComponent(movie.imdbID);
            window.location.href = `next.html?movieId=${movieId}`;
        });

        searchResultsDiv.appendChild(movieInfoDiv);
    });
}

function showMovieDetails(movieId) {
    var apiKey = '587b4d33'; // Replace with your actual API key
    var apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(movieDetails => {
            // Display movie details in the #movie-details-container element
            var movieDetailsContainer = document.getElementById("movie-details-container");

            var titleElement = document.createElement("h2");
            titleElement.textContent = movieDetails.Title;

            var imageElement = document.createElement("img");
            imageElement.src = movieDetails.Poster;
            imageElement.alt = movieDetails.Title;

            var plotElement = document.createElement("p");
            plotElement.textContent = movieDetails.Plot;

            movieDetailsContainer.appendChild(titleElement);
            movieDetailsContainer.appendChild(imageElement);
            movieDetailsContainer.appendChild(plotElement);
        })
        .catch(error => console.error('Error fetching movie details:', error));
}

// Debounce function to limit API requests while typing
function debounce(func, delay) {
    var timeout;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(func, delay);
    };
}
