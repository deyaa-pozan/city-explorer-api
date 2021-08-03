const express = require("express");
const cors = require('cors')
const app = express();
const weather = require('./data/weather.json')
const axios = require('axios')
app.use(cors())
require('dotenv').config()

app.get('/', (req, res) => {
  res.send('hi')
})

class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}

class Movies {
  constructor(title, overview, average_votes, total_votes, image_url, popularity, released_on) {
    this.title = title;
    this.overview = overview;
    this.average_votes = average_votes;
    this.total_votes = total_votes;
    this.image_url = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${image_url}`;
    this.popularity = popularity;
    this.released_on = released_on;
  }
}

app.get('/weather', async (req, res) => {
  let latitude = req.query.lat;
  let longitude = req.query.lon;
  const urlForecast = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=${process.env.WEATHER_API_KEY}`
  axios.get(urlForecast)
    .then((result) => {


      const arrOfDays = [];
      result.data.data.forEach(obj => {
        let descriptionDay = `Low of ${obj.low_temp}, high of ${obj.high_temp} with ${obj.weather.description}`;
        let weatherDay = new Forecast(obj.valid_date, descriptionDay);
        arrOfDays.push(weatherDay);
      });
      res.send(arrOfDays);
    })
    .catch((err) => {
      res.send(err.message);
    });
});

app.get('/movies', async (req, res) => {

  let searchQuery = req.query.searchQuery;
  const urlMovies = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&page=1&query=${searchQuery}`
  //http://localhost:8080/movies?searchQuery=Amman
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
      res.send(movieArray);
    })
    .catch((err) => {
      res.send(err.message);
    });
});

//http://localhost:8080/weather?lon=35.91&lat=31.95&searchQuery=Amman

app.listen(process.env.PORT, () => {
  console.log(`connected http://localhost:${process.env.PORT}`)
})