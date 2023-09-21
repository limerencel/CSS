let searchName = document.querySelector(".search-input");
let displayName = document.getElementById("movie-name");
let searchBtn = document.querySelector(".search-button");
let result = document.querySelector(".result");

//fetching data from API

let getMovie = (e) => {
  e.preventDefault();
  let movieName = searchName.value;
  let url = `http://www.omdbapi.com/?t=${movieName}&apikey=f3437fe2`;
  // if input filed is empty
  if (movieName.length <= 0) {
    result.innerHTML = `<h3 class="msg">Please enter a movie name</h3>`;
  }
  // if it's not
  else {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        // if movie exist in database
        if (data.Response == "True") {
          result.innerHTML = `
          <div class="overview">
            <img
              src=${data.Poster}
              alt=""
              class="poster"
            />
            <div class="content">
              <h2 id="movie-name">${data.Title}</h2>
              <div class="rating">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#eab308"
                    d="m5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275L5.825 22Z"
                  />
                </svg>
                <span>${data.imdbRating}</span>
              </div>
              <div class="parent">
                <span>${data.Rated}</span>
                <span>${data.Year}</span>
                <span>${data.Runtime}</span>
              </div>
              <div class="sort">
                <div>${data.Genre.split(",").join("</div><div>")}</div>
              </div>
            </div>
          </div>
          <div class="plot">
            <h2>Plot</h2>
            <span>${data.Plot}</span>
          </div>
          <div class="cast">
            <h2>Cast</h2>
            <span>${data.Actors}</span>
        </div>`;
        }
        // if movie doesn't exist in databse
        else {
          result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
        }
      })
      .catch(() => {
        result.innerHTML = `<h3 class="msg>Error occured</h3>`;
      });
  }
};

searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);
