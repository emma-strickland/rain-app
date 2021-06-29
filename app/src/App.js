import './App.css';
import React, { useState } from 'react';


const openWeatherApi = {
  key: "93da148cde43b30ed7c6df2296294e89",
  base: "https://api.openweathermap.org/data/2.5/"
}

const zipCodeApi = {
  key: "nBYlPO8pEqiMZBYx6OHjZnaXhcdY5Z7y3z6lhk4NdZuVzlr1ol5jh5UBuXKcZgBR",
  base: "https://www.zipcodeapi.com/rest/"  
}

function App() {
  const [zipCode, setZipCode] = useState('');
  const [rain, setRain] = useState({});
  const [isRainingToday, setIsRainingToday] = useState('');

  const getLatAndLong = zipCodeApiResponse => {
    let latAndLong = [];
    latAndLong.push(zipCodeApiResponse['lat'], zipCodeApiResponse['lng'])
    return latAndLong;
  }

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

  const search = evt => {
    if (evt.key === "Enter") {
      // TODO: make API request with zip code to get lat and long
      fetch(`${zipCodeApi.base}${zipCodeApi.key}/info.json/${zipCode}/degrees`)
        .then(res => res.json())
        .then(result => {
          console.log('zip code api: ', result);
          // // TODO: get lat and lng from result
          // let latAndLong = getLatAndLong(result);

          // // TODO: make request with lat and long
          // fetch(`${openWeatherApi.base}onecall/lat=${latAndLong[0]}&lon=${latAndLong[1]}&exclude=current,
          // minutely,hourly,alerts${openWeatherApi.key}`)
          //   .then(res => res.json())
          //   .then(result => {
          //     setRain(result);
          //     setZipCode('');
          //     // TODO: set to proper value
          //     setIsRainingToday(isRaining(result));
          //     console.log(result)
          //   });
        });

    };
  }

  return (
    <div className="App">
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Enter zip code"
            onChange={e => setZipCode(e.target.value)}
            value={zipCode}
            onKeyPress={search}
          />
        </div>
        {(typeof rain.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{rain.name}, {rain.sys.country}</div>
              <div className="date">{new Date().toDateString()}</div>
            </div>
            {
              isRainingToday !== undefined &&
                <div className="rains">
                  {
                    isRainingToday === true
                      ?  <div className="rain-true">Yes, it will rain today!</div>
                      : <div className="rain-false">No, it will not rain today :(</div>
                  }
                </div>
            }
          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
