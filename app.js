let date = new Date();
let nowDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
 // TMDB API
const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
const TMDB_API_KEY_HEAD = '&api_key='
const TMDB_API_KEY = 'bf3cd4782b9e4403874602094b3d319c'
const TMBDB_IMAGE_URL = 'https://image.tmdb.org/t/p/original'
const TMDB_NOW_POPULAR_MOVIES_KEY = '/discover/movie?sort_by=popularity.desc'
const TMDB_NOW_YEAR_BEST_TV_LIST = '/discover/tv?sort_by=popularity.desc'



// OMDBP API
const OMDBAPI_BASE_URL = 'https://www.omdbapi.com/'
const OMDBAPI_KEY = '?apikey=114734b&'

var headerMovieText = document.querySelector('.header-movie-text')
var headerMovieYear = document.querySelector('.header-movie-year')
var headerMovieRating = document.querySelector('.rat')
var headerMovieDesc = document.querySelector('.header-movie-desc')
var headerMovieType = document.querySelector('.header-movie-type')
var headerMovieImg = document.querySelector('#header-movie-img')
var headerBg = document.querySelector('#headerBg')

let visioncardindexCount = 0;
var visionCardAll = document.querySelector('.vision-cards')

let tvlistButton = document.getElementById('tv-list')
let movielistButton = document.getElementById('movie-list')


function popularMovieAdd(img,txt) {
  

    let visionCard = document.createElement('div')
    visionCard.classList.add('vision-card')
    visionCard.style.backgroundImage = `url('${img}')`
    visionCardAll.appendChild(visionCard)


    let popularMovieText = document.createElement('p')
    popularMovieText.classList.add('v-text')
    popularMovieText.innerHTML = txt
    visionCard.appendChild(popularMovieText)

    visionCard.dataset.headerindex = visioncardindexCount;
    visioncardindexCount ++
}

addEventListener('click',(e)=> {
  
    const eventTarget = e.target
    if (eventTarget.classList[0] == 'vision-card') {
        if (movielistButton.classList[1] == 'header-button-active') {
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${eventTarget.textContent}&page=1&include_adult=false`)
            .then(response => response.json())
            .then(data => {
                headerMovieText.textContent = data.results[0].title
                headerMovieYear.textContent = data.results[0].release_date.substring(0,4)
                headerMovieRating.textContent = String(data.results[0].vote_average).slice(0,3);
                headerMovieType.textContent = genreIdConverter(true,data.results[0].genre_ids)
                headerMovieDesc.textContent = data.results[0].overview
                headerMovieImg.src = `${TMBDB_IMAGE_URL}${data.results[0].poster_path}`
                headerBg.src = `${TMBDB_IMAGE_URL}${data.results[0].backdrop_path}`
            })
        }
        if(movielistButton.classList[1] != 'header-button-active') {
            fetch(`https://api.themoviedb.org/3/search/tv?api_key=${TMDB_API_KEY}&language=en-US&query=${eventTarget.textContent}&page=1&include_adult=false`)
            .then(response => response.json())
            .then(data=> {
                headerMovieText.textContent = data.results[0].name
                headerMovieYear.textContent = data.results[0].first_air_date.substring(0,4)
                headerMovieType.textContent = genreIdConverter(false,data.results[0].genre_ids)
                headerMovieRating.textContent = String(data.results[0].vote_average).slice(0,3);
                headerMovieDesc.textContent = data.results[0].overview
                headerMovieImg.src = `${TMBDB_IMAGE_URL}${data.results[0].poster_path}`
                headerBg.src = `${TMBDB_IMAGE_URL}${data.results[0].backdrop_path}`
            })
        }          
    }
})

// categories
let Categories = document.querySelector('.categories')
const movieList = [
    {
        "name": "Popular",
        "dataID" : 0
    },
    {
        "name": "Action",
        "dataID": 28
    },
    {
        "name": "Adventure",
        "dataID": 12
    },
    {
        "name": "Animation",
        "dataID": 16
    },
    {
        "name": "Comedy",
        "dataID": 35
    },
    {
        "name": "Crime",
        "dataID": 80
    },
    {
        "name": "Documentary",
        "dataID": 99
    },
    {
        "name": "Drama",
        "dataID": 18
    },
    {
        "name": "Family",
        "dataID": 10751
    },
    {
        "name": "Fantasy",
        "dataID": 14
    },
    {
        "name": "History",
        "dataID": 36
    },
    {
        "name": "Horror",
        "dataID": 27
    },
    {
        "name": "Music",
        "dataID": 10402
    },
    {
        "name": "Mystery",
        "dataID": 9648
    },
    {
        "name": "Romance",
        "dataID": 10749
    },
    {
        "name": "Science Fiction",
        "dataID": 878
    },
    {
        "name": "TV Movie",
        "dataID": 10770
    },
    {
        "name": "Thriller",
        "dataID": 53
    },
    {
        "name": "War",
        "dataID": 10752
    },
    {
        "name": "Western",
        "dataID": 37
    }
]
const tvList = [
    {
        "name": "Popular",
        "dataID" : 0
    },
    {
        "name": "Action & Adventure",
        "dataID": 10759
    },
    {
        "name": "Animation",
        "dataID": 16
    },
    {
        "name": "Comedy",
        "dataID": 35
    },
    {
        "name": "Crime",
        "dataID": 80
    },
    {
        "name": "Documentary",
        "dataID": 99
    },
    {
        "name": "Drama",
        "dataID": 18
    },
    {
        "name": "Family",
        "dataID": 10751
    },
    {
        "name": "Kids",
        "dataID": 10762
    },
    {
        "name": "Mystery",
        "dataID": 9648
    },
    {
        "name": "News",
        "dataID": 10763
    },
    {
        "name": "Sci-Fi & Fantasy",
        "dataID": 10765
    },
    {
        "name": "Soap",
        "dataID": 10766
    },
    {
        "name": "Talk",
        "dataID": 10767
    },
    {
        "name": "War & Politics",
        "dataID": 10768
    },
    {
        "name": "Western",
        "dataID": 37
    }
]
let listCategories = (array) =>{
    Categories.innerHTML = ""
    for (let index = 0; index < array.length; index++) {
        let category = document.createElement('div')
        category.textContent = array[index].name
        category.dataset.id = array[index].dataID
        Categories.appendChild(category)

    }
}

function movieHeaderClickList() {
    visioncardindexCount = 0
    const popularMovies = document.querySelector('.vision-cards')
    popularMovies.innerHTML = ""
    listCategories(movieList)
    movielistButton.classList.add('header-button-active')
    tvlistButton.classList.remove('header-button-active')

    // popular 0.index header
    fetch('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=bf3cd4782b9e4403874602094b3d319c')
    .then(res=>res.json())
    .then(data => {
       
        
        headerMovieText.textContent = data.results[0].title
        headerMovieYear.textContent = data.results[0].release_date.substring(0,4)
        headerMovieRating.textContent = String(data.results[0].vote_average).slice(0,3)
        headerMovieDesc.textContent = data.results[0].overview
        headerMovieImg.src = `${TMBDB_IMAGE_URL}${data.results[0].poster_path}` 
        headerMovieType.textContent = genreIdConverter(true,data.results[0].genre_ids)
        headerBg.src = `${TMBDB_IMAGE_URL}${data.results[0].backdrop_path}` 

    })
    // popular 0index headerend


    // popular movies 
   
   
    fetch(`${TMDB_BASE_URL}${TMDB_NOW_POPULAR_MOVIES_KEY}${TMDB_API_KEY_HEAD }${TMDB_API_KEY}`)
    .then(res => res.json())
    .then(data => {

        for(let i = 0; i< 5; i++) {
            popularMovieAdd(`${TMBDB_IMAGE_URL}${data.results[i].poster_path}`,data.results[i].original_title)
        }
        
        
    })
    // popular movies cards header end
}
function genreIdConverter(bool,array) {
    let isMovie = bool
    let genreFullText = ""
    if(isMovie == true) {
       for(let i = 0; i < array.length; i++) {
        movieList.filter(movieGender => {
            if (movieGender.dataID == array[i]) {
                genreFullText += `${movieGender.name}, `
            }
        })
       }
    }
    else {
        for(let i = 0; i < array.length; i++) {
            movieList.filter(seriesGender => {
                if (seriesGender.dataID == array[i]) {
                    genreFullText += `${seriesGender.name}, `
                    
                }
            })
           }
    }
    return genreFullText
}

function tvHeaderClickList() {
    visioncardindexCount = 0
    const popularMovies = document.querySelector('.vision-cards')
    popularMovies.innerHTML = ""
    listCategories(movieList)
    movielistButton.classList.remove('header-button-active')
    tvlistButton.classList.add('header-button-active')

    // popular 0.index header
    fetch('https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&api_key=bf3cd4782b9e4403874602094b3d319c')
    .then(res=>res.json())
    .then(data => {
        headerMovieText.textContent = data.results[0].name
        headerMovieYear.textContent = String(data.results[0].first_air_date).substring(0,4)
        headerMovieType.textContent = genreIdConverter(false,data.results[0].genre_ids)
        headerMovieRating.textContent = String(data.results[0].vote_average).slice(0,3)
        headerMovieDesc.textContent = data.results[0].overview
        headerMovieImg.src = `${TMBDB_IMAGE_URL}${data.results[0].poster_path}` 
        headerBg.src = `${TMBDB_IMAGE_URL}${data.results[0].backdrop_path}` 
    })
    // popular 0index headerend


    // popular tvlist
   
   
    fetch(`${TMDB_BASE_URL}${TMDB_NOW_YEAR_BEST_TV_LIST}${TMDB_API_KEY_HEAD}${TMDB_API_KEY}`)
    .then(res => res.json())
    .then(data => {

        for(let i = 0; i< 5; i++) {
            popularMovieAdd(`${TMBDB_IMAGE_URL}${data.results[i].poster_path}`,data.results[i].name)
        }
        
        
    })
    // popular movies cards header end

}
movielistButton.addEventListener("click",movieHeaderClickList)

tvlistButton.addEventListener('click',tvHeaderClickList)


movielistButton.click()

// content start

var allMovies = document.querySelector('.all-movies')
function cardAdd(src,name,year) {
    let card = document.createElement('div')
    card.classList.add('card')
    allMovies.appendChild(card)

    let cardImg = document.createElement('img')
    cardImg.src = src
    card.appendChild(cardImg)

    let cardText = document.createElement('p')
    cardText.textContent = name
    card.appendChild(cardText)

    let cardYear = document.createElement('p')
    cardYear.textContent = year
    card.appendChild(cardYear)


}

    fetch('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=bf3cd4782b9e4403874602094b3d319c&page=1S&language=EN')
    .then(response => response.json())
    .then(data1 => {
        for(let i = 0; i < data1.results.length; i++){
            fetch(`${OMDBAPI_BASE_URL}${OMDBAPI_KEY}t=${data1.results[i].title}&plot=full`)
            .then(res=> res.json())
            .then(data2 => {
                cardAdd(`${TMBDB_IMAGE_URL}${data1.results[i].poster_path}`,data1.results[i].title,data2.Year)
            })
        }
    })
    const pageCount = document.querySelector('#pageNumber')
    function pagePlus() {
       pageCount.value = Number(pageCount.value) + 1
    }
    function pageMin() {
        if(Number(pageCount.value) > 1) {
            pageCount.value = Number(pageCount.value) - 1
        }
        
    }