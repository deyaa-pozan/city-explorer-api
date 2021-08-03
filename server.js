const express = require("express");
const cors = require('cors')
const app = express();
const weather = require('./data/weather.json')
const getMovies = require('./controller/Movie.controller')
const getWeather = require('./controller/Forecast.controller')
app.use(cors())
require('dotenv').config()

app.get('/', (req, res) => {
  res.send('hi')
})



app.get('/weather', getWeather);
app.get('/movies', getMovies);



app.listen(process.env.PORT, () => {
  console.log(`connected http://localhost:${process.env.PORT}`)
})