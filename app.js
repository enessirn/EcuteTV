let date = new Date();
let nowDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
 // TMDB API
const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
const TMDB_API_KEY_HEAD = '&api_key='
const TMDB_API_KEY = 'bf3cd4782b9e4403874602094b3d319c'

const TMDB_NOW_POPULAR_MOVIES_KEY = '/discover/movie?sort_by=popularity.desc'
const TMDB_NOW_YEAR_BEST_TV_LIST = `/discover/movie?with_genres=18&primary_release_year=${date.getFullYear()}`



// OMDBP API
const OMDBAPI_BASE_URL = 'http://www.omdbapi.com/'
const OMDBAPI_KEY = '?apikey=114734b&'

// popular movies header 
    // TMDB API
    fetch('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=bf3cd4782b9e4403874602094b3d319c')
    .then(res=>res.json())
    .then(data => {
        let headerMovieText = document.querySelector('.header-movie-text')
        let headerMovieYear = document.querySelector('.header-movie-year')
        let headerMovieRating = document.querySelector('.rat')
        let headerMovieDesc = document.querySelector('.header-movie-desc')
        
        headerMovieText.textContent = data.results[0].original_title
        headerMovieYear.textContent = data.results[0].release_date.substring(0,4)
        headerMovieRating.textContent = data.results[0].vote_average
        headerMovieDesc.textContent = data.results[0].overview
        
        let bestPopularMovieText = data.results[0].original_title

        //  OMDBAPI
        fetch(`${OMDBAPI_BASE_URL}${OMDBAPI_KEY}t=${bestPopularMovieText}&y=${data.results[0].release_date.substring(0,4)}&plot=full`)
        .then(respon => respon.json())
        .then(data => {
            let headerMovieTime = document.querySelector('.header-movie-time')
            let headerMovieType = document.querySelector('.header-movie-type')
            let headerMovieImg = document.querySelector('#header-movie-img')
            let headerBg = document.querySelector('#headerBg')
            console.log(data)
            headerMovieTime.textContent = data.Runtime
            headerMovieType.textContent = data.Genre
            headerMovieImg.src = data.Poster
            headerBg.src = data.Poster
        })
    })

