const Movies = require('../model/Movie.model')
const axios = require('axios')
let MyMemory = {};
const getMovies = async (req, res) => {

    let searchQuery = req.query.searchQuery;
    const urlMovies = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&page=1&query=${searchQuery}`
    //http://localhost:8080/movies?searchQuery=Amman

    if (MyMemory[searchQuery] !== undefined) {
      res.send(MyMemory[searchQuery]);
    } else {
    axios.get(urlMovies)
      .then((result) => {
        const movieArray = [];
        result.data.results.forEach(obj => {
          let moviesData  = new Movies( 
            obj.title,
            obj.overview,
            obj.vote_average,
            obj.vote_count,
            obj.poster_path,
            obj.popularity,
            obj.release_date);
            movieArray.push(moviesData );
        });
        MyMemory[searchQuery] = movieArray;
        res.send(movieArray);
      })
      .catch((err) => {
        res.send(err.message);
      });
    }
  }
  
  module.exports = getMovies;