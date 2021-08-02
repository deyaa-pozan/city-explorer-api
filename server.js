const express = require("express");
const cors = require('cors')
const app = express();
const weather = require('./data/weather.json')
app.use(cors())
require('dotenv').config()

app.get('/', (req, res) => {
    res.send(weather)
  })

  class Forecast {
    constructor(date, description) {
      this.date = date;
      this.description = description;
    }
  }
  app.get('/weather',(req,res) => {
    let latitude = req.query.lat;
    let longitude = req.query.lon;
    let searchQuery = req.query.searchQuery;

    const found = weather.find(element => element.lat == latitude&&element.lon == longitude&&element.city_name == searchQuery);
console.log(found);
    const arrOfDays =[];
    found.data.forEach(obj=>{
      let descriptionDay = `Low of ${obj.low_temp}, high of ${obj.high_temp} with ${obj.weather.description}`;
      let weatherDay = new Forecast(obj.valid_date, descriptionDay);
      arrOfDays.push(weatherDay);
    });
    res.send(arrOfDays);
  });

  //http://localhost:8080/weather?lon=35.91&lat=31.95&searchQuery=Amman

app.listen(process.env.PORT, () => {
    console.log(`connected http://localhost:${process.env.PORT}`)
  })