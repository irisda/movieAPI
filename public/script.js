const tmdbKey = 'aaa81cb283a5a2ace40f505e10725a52';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

const getGenres = async () => {
    const genreRequestEndpoint = '/genre/movie/list';
    const requestParams = `?api_key=${tmdbKey}`;
    const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;
    try {
        let response = await fetch(urlToFetch);
        if (response.ok) {
            const jsonResponse = await response.json();
            const generes = jsonResponse.generes;
            console.log(generes)
            return generes;
        }

    }
    catch (error) {
        console.log(error)
    }
};
//Get a Random Movie
const getMovies = async () => {
    const selectedGenre = getSelectedGenre();
    const discoverMovieEndpoint = '/discover/movie';
    const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`;
    const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;

    try {
        let response = await fetch(urlToFetch);
        if (response.ok) {
            const jsonResponse = await response.json();
            const movies = jsonResponse.results;
            return movies;
        }
    }
    catch (errors) {
        console.log(error)

    }

};


//Get Movie Info 
//function to fetch the details of a random movie from the list of movies we returned in getMovies()
const getMovieInfo = async (movie) => {
    const movieId = movie.id;
    const movieEndpoint = `/movie/${movieId}`;
    const requestParams = `?api_key=${tmdbKey}`;
    const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;
    try {
        let response = await fetch(urlToFetch);
        if (response.ok) {
            let movieInfo = await response.json();
            return movieInfo
        }
    }
    catch (error) {
        console.log(error);
    }


};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
    const movieInfo = document.getElementById('movieInfo');
    if (movieInfo.childNodes.length > 0) {
        clearCurrentMovie();
    };
const movies = await getMovies();
const randomMovie = await getRandomMovie(movies);
const info = await getMovieInfo(randomMovie);
displayMovie(info);

};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;


// Congratulations! You’ve finished building the Film Finder project! If you’re looking for additional ways to challenge yourself, consider the following:

// Checkout the displayMovie() function in helpers.js to use the DOM to rearrange the layout of information on the page. Try displaying different types of information like cast, or release date.
// Create a way to store a user’s liked and disliked movies and display this list on the page.
// Our API call inside of getMovies() returns many pages of results, but currently our program only randomizes results from the first page. To randomize our results even more, update getMovies() so that movies contains results from a random page instead of the first page.