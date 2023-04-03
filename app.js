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

var headerMovieText = document.querySelector('.header-movie-text')
var headerMovieYear = document.querySelector('.header-movie-year')
var headerMovieRating = document.querySelector('.rat')
var headerMovieDesc = document.querySelector('.header-movie-desc')
var headerMovieTime = document.querySelector('.header-movie-time')
var headerMovieType = document.querySelector('.header-movie-type')
var headerMovieImg = document.querySelector('#header-movie-img')
   
let visioncardindexCount = 0;
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

    visionCard.dataset.headerindex = visioncardindexCount;
    visioncardindexCount ++
}

addEventListener('click',(e)=> {
    const eventTarget = e.target
    if (eventTarget.classList[0] == 'vision-card') {
        fetch(`${OMDBAPI_BASE_URL}${OMDBAPI_KEY}t=${eventTarget.textContent}&plot=full`)
        .then(res => res.json())
        .then(data=> {
            headerMovieText.textContent = data.Title
            headerMovieYear.textContent = data.Year
            headerMovieRating.textContent = data.imdbRating
            headerMovieDesc.textContent = data.Plot
            headerMovieTime.textContent = data.Runtime
            headerMovieType.textContent = data.Genre
            headerMovieImg.src = data.Poster
            headerBg.src = data.Poster
        })
            
    }
})

// categories
let Categories = document.querySelector('.categories')
let tvlistButton = document.getElementById('tv-list')
let movielistButton = document.getElementById('movie-list')

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

movielistButton.addEventListener("click",(()=> {
    const popularMovies = document.querySelector('.vision-cards')
    popularMovies.innerHTML = ""
    listCategories(movieList)
    movielistButton.classList.add('header-button-active')
    tvlistButton.classList.remove('header-button-active')

    // popular 0.index header
    fetch('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=bf3cd4782b9e4403874602094b3d319c')
    .then(res=>res.json())
    .then(data => {
       
        
        headerMovieText.textContent = data.results[0].original_title
        headerMovieYear.textContent = data.results[0].release_date.substring(0,4)
        headerMovieRating.textContent = data.results[0].vote_average
        headerMovieDesc.textContent = data.results[0].overview
        
        let bestPopularMovieText = data.results[0].original_title

        //  OMDBAPI
        fetch(`${OMDBAPI_BASE_URL}${OMDBAPI_KEY}t=${bestPopularMovieText}&y=${data.results[0].release_date.substring(0,4)}&plot=full`)
        .then(respon => respon.json())
        .then(data => {
           
            let headerBg = document.querySelector('#headerBg')
            headerMovieTime.textContent = data.Runtime
            headerMovieType.textContent = data.Genre
            headerMovieImg.src = data.Poster
            headerBg.src = data.Poster
        })
    })
    // popular 0index headerend


    // popular movies 
   
   
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
    // popular movies cards header end

}))
tvlistButton.addEventListener('click',(()=> {
    const popularMovies = document.querySelector('.vision-cards')
    popularMovies.innerHTML = ""
    listCategories(tvList)
    movielistButton.classList.remove('header-button-active')
    tvlistButton.classList.add('header-button-active')

    fetch(`${TMDB_BASE_URL}${TMDB_NOW_YEAR_BEST_TV_LIST}${TMDB_API_KEY_HEAD}${TMDB_API_KEY}`)
    .then(response => response.json())
    .then(data1 => {
        headerMovieText.textContent = data1.results[0].original_title
        headerMovieYear.textContent = data1.results[0].release_date.substring(0,4)
        headerMovieRating.textContent = data1.results[0].vote_average
        headerMovieDesc.textContent = data1.results[0].overview
        
        // omdb api series

        fetch(`${OMDBAPI_BASE_URL}${OMDBAPI_KEY}t=${data1.results[0].original_title}&y=${data1.results[0].release_date.substring(0,4)}&plot=full`)
        .then(res=> res.json())
        .then(data2 => {
            let headerBg = document.querySelector('#headerBg')
            headerMovieTime.textContent = data2.Runtime
            headerMovieType.textContent = data2.Genre
            headerMovieImg.src = data2.Poster
            headerBg.src = data2.Poster;
        })

    //    popular series 
        for(let i = 0; i< 5; i++) {

            fetch(`${OMDBAPI_BASE_URL}${OMDBAPI_KEY}t=${data1.results[i].original_title}&y=${data1.results[i].release_date.substring(0,4)}&plot=full`)
            .then(res2 => res2.json())
            .then(data2 => {
                popularMovieAdd(data2.Poster,data1.results[i].original_title);
        })
        }
    })
    }))

movielistButton.click()

