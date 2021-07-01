const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');
const express = require("express");

// Read environment variables.
dotenv.config();

// Third-party API URLs
const OPEN_WEATHER_API_BASE_URL = "https://api.openweathermap.org/data/2.5/";
const ZIP_CODE_API_BASE_URL = "https://www.zipcodeapi.com/rest/";

// Error messages
const ERROR_GENERAL = "There was an error fetching weather data for your zip code. Try again later.";

const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());

let zipCodeCache = {};

const isRaining = openWeatherResponse => {
    let possibleRains = ["rain", "thunderstorm", "heavy rain", "light rain"]
    for (let key in openWeatherResponse) {
        key = "daily"
        if (possibleRains.includes(openWeatherResponse[key][0].weather[0].main.toLowerCase())) {
            return true;
        }
    }
    return false;
}

const getOpenWeatherUrl = (lat, lng) => {
    let url = `${OPEN_WEATHER_API_BASE_URL}onecall?`;
    url += `lat=${lat}&lon=${lng}`;
    url += `&exclude=current,minutely,hourly,alerts&appid=${process.env.OPEN_WEATHER_API_KEY}`;
    return url;
}

const makeError = () => {
    return {
        error: {
            message: ERROR_GENERAL
        }
    }
}

const getWeather = (zipCodeResponse, callback) => {
    let city = zipCodeResponse.data.city;
    let state = zipCodeResponse.data.state;
    axios.get(getOpenWeatherUrl(zipCodeResponse.data.lat, zipCodeResponse.data.lng))
        .then(response => {
            let isRainingToday = isRaining(response.data);
            callback({
                city: city,
                state: state,
                isRainingToday: isRainingToday
            })
        })
        .catch(error => {
            console.log('Open weather API error: ', error);
            callback(makeError());
        })
}

app.get("/rainData", (req, res) => {
    let zip = req.query.zip;
    if (!zip) {
        res.status(400).json({
            zipCodeError: "invalid zip code!"
        })
    }

    let weatherResultCallback = (weatherResult) => {
        res.json(weatherResult)
    };

    if (zip in zipCodeCache) {
        console.log(`Found zip code <${zip}> in cache!`);
        let zipCodeResponse = zipCodeCache[zip];
        getWeather(zipCodeResponse, weatherResultCallback);
        return;
    }

    console.log(`Zip code <${zip}> not in cache`);
    axios.get(`${ZIP_CODE_API_BASE_URL}${process.env.ZIP_CODE_API_KEY}/info.json/${zip}/degrees`)
        .then(zipCodeResponse => {
            console.log(response.data);
            zipCodeCache[zip] = zipCodeResponse;
            getWeather(zipCodeResponse, weatherResultCallback);
        })
        .catch(error => {
            console.log('Zip code API error: ', error);
            res.json(makeError());
        });
});

if (!process.env.ZIP_CODE_API_KEY) {
    console.log('ZIP_CODE_API_KEY must be set');
    return;
}

if (!process.env.OPEN_WEATHER_API_KEY) {
    console.log('OPEN_WEATHER_API_KEY must be set');
    return;
}

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})