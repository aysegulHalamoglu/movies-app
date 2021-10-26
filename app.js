// ********* Constants by themoviedb.org *********************************** //

const API_KEY = "8e636ff80b5cd813d55044edab70fd96"; // incase we do not want to share our API key
const IMAGE_URL = "https://image.tmdb.org/t/p/w500"; // special image URL for this site -> it should be combined with poster_path
const BASE_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;
const POPULAR_MOVIES = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;

// ********* Selecting Elements from DOM  *********************************** //
const gallery = document.querySelector("#gallery");
const searchbar = document.querySelector("#searchbar");
const goUp = document.querySelector("#goUp");

// ********* Homepage view function **************************************** //

function fetchAPI(e) {
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

// ********* Searchbar Functionality ****************************************** //
searchbar.onkeyup = function getMovie(e) {
  if (e.keyCode && searchbar.value) {
    //while pressing key and if there is value run this func
    e.preventDefault(); // prevent refreshing page
    const value = searchbar.value; // getting value
    const newUrl = BASE_URL + value; // query which we want to search for

    console.log("Input value: ", value);

    fetchAPI(newUrl); // fetch url with our input
  } else if (e.keyCode) {
    //pressing but while there is no value, fetch url with popular movies
    fetchAPI(POPULAR_MOVIES);
  }
};

// ********* Movies Rendering Function ***************************************** //

function showMovies(data) {
  gallery.innerHTML = "";
  // it is needed for sending our input value
  data.forEach((movie) => {
    const { title, poster_path, vote_average, release_date } = movie;
    // to understand this syntax please search for --> destructuring assignment
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");
    // div element was created with movie class and inside below elements were added
    movieElement.innerHTML = `
            <div class="imageCard">
                
                <img 
                src=${
                  poster_path
                    ? IMAGE_URL + poster_path
                    : "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png"
                } 
                alt="${title}">
                 
              
            </div>

            <div class="topInfo">
            <p class="movieName tooltip">${getShorten(title)}
                    <span class="${getTooltip(title)}">${title}</span></p>
            <p class="movieVote ${changeColor(
              vote_average
            )}">${vote_average}</p> 
        </div>

        <div id="bottomInfo">
            <p class="movieYear">${release_date.slice(0, 4)}</p>
        </div>
          
            
        `;
    // incase no movie picture , an url added  by ternary function
    // slice() method was used for shortening the movie name and also taking the year from the release date
    gallery.appendChild(movieElement);
    //movieElement is being sent to gallery element with this DOM method
  });
}

// ********* Displaying Tooltip Function ***************************************** //

function getTooltip(text) {
  if (text.length >= 11) {
    // above 10,  assume class is text : display tooltip
    return "text";
  } else {
    return "no-text";
  } // below 10,  assume class is no-text : hide tooltip
}

// ********* Vote Color(red/green) Change Function ***************************************** //

function changeColor(vote) {
  // above 5, turn the color green
  if (vote >= 5) {
    return "green";
  } else {
    return "red";
  } // below 5,  turn the color red
}

// ********* Movie Name Shortening Function ***************************************** //

//add ... to end
function getShorten(text) {
  if (text.length >= 11) {
    // above 11,  assume class is text : display tooltip
    return `${text.slice(0, 10)}...`;
  } else {
    return `${text}`;
  } // below 11,  assume class is no-text : hide tooltip
}

// ********* Scroll Up Function ************************************************** //

goUp.onclick = function goUp(e) {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
};
