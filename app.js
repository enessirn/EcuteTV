const BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = 'bf3cd4782b9e4403874602094b3d319c'

const NOW_POPULAR_MOVIES_KEY = '/discover/movie?sort_by=popularity.desc'
const YEAR_POPULAR_MOVIES = '/discover/movie?primary_release_year=2022&sort_by=vote_average.desc'

fetch('https://api.themoviedb.org/3/discover/movie?primary_release_year=2022&sort_by=vote_average.desc&api_key=bf3cd4782b9e4403874602094b3d319c')
.then(res=>res.json())
.then(data => console.log(data))
