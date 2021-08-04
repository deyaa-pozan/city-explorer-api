const Forecast = require('../model/Forecast.model');
const axios = require('axios')

const getWeather = async (req, res) => {
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
  }
  //http://localhost:8080/weather?lon=35.91&lat=31.95&searchQuery=Amman
  module.exports = getWeather;