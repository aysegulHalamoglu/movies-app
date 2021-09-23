// ********* Constants by themoviedb.org *********************************** //

const API_KEY = "8e636ff80b5cd813d55044edab70fd96"; // incase we do not want to share our API key
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500'; // special image URL for this site -> it should be combined with poster_path
const POPULAR_MOVIES = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`

// ********* Selecting Elements from DOM  *********************************** //
const main = document.querySelector('#gallery');

// ********* Homepage view function **************************************** //

function fetchAPI(e){
    fetch(e)
    .then((response) => response.json())
    .then((data) => { 
      // results will be rendered here 
        console.log("Data: ", data.results);
        showMovies(data.results);
    })
    .catch((error) => console.log("Error: ", error));
}

fetchAPI(POPULAR_MOVIES);

// ********* Movies Rendering Function ***************************************** //

function showMovies(data) {
    main.innerHTML = '';
    // it is needed for sending our input value
    data.forEach(movie => {
        const {title, poster_path,vote_average,release_date} = movie;
        // to understand this syntax please search for --> destructuring assignment
        const movieElement = document.createElement('div');
        movieElement.classList.add("movie");
        // div element was created with movie class and inside below elements were added
        movieElement.innerHTML = `
        <img 
            src=${poster_path? IMAGE_URL+poster_path :              
            "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png"} 
            alt="${title}">
            
                <div class="top-info">
                    <p class="movie-name">${title.length>=10?title.slice(0,10)+'...': title}
                    <span >${title}</span>
                    </p>
                    <p class="movie-vote">${vote_average}</p> 
                </div>

                <div id="bottom-info">
                    <p class="movie-year">${release_date.slice(0,4)}</p>
                </div>
        `
        // incase no movie picture , an url added  by ternary function  
        // slice() method was used for shortening the movie name and also taking the year from the release date  
        main.appendChild(movieElement);
        //movieElement is being sent to main element with this DOM method
    })
}
