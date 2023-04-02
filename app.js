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
            headerMovieTime.textContent = data.Runtime
            headerMovieType.textContent = data.Genre
            headerMovieImg.src = data.Poster
            headerBg.src = data.Poster
        })
    })

// popular movies 
const popularMovies = document.querySelectorAll('.vision-card')
fetch(`${TMDB_BASE_URL}${TMDB_NOW_POPULAR_MOVIES_KEY}${TMDB_API_KEY_HEAD }${TMDB_API_KEY}`)
.then(res => res.json())
.then(data1 => {
  
     for(let i = 0; i< 5; i++) {

        fetch(`${OMDBAPI_BASE_URL}${OMDBAPI_KEY}t=${data1.results[i].original_title}&y=${data1.results[i].release_date.substring(0,4)}&plot=full`)
        .then(res2 => res2.json())
        .then(data2 => {
            popularMovieAdd(data2.Poster,data1.results[i].original_title)
    })
    }
    
    
})
var visionCardAll = document.querySelector('.vision-cards')
function popularMovieAdd(img,txt) {
  

    let visionCard = document.createElement('div')
    visionCard.classList.add('vision-card')
    visionCard.style.backgroundImage = `url('${img}')`
    visionCardAll.appendChild(visionCard)


    let popularMovieText = document.createElement('p')
    popularMovieText.classList.add('v-text')
    popularMovieText.innerHTML = txt
    visionCard.appendChild(popularMovieText)

}