import './App.css';
import React, { useState } from 'react';


const api = {
  key: "93da148cde43b30ed7c6df2296294e89",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [zipCode, setZipCode] = useState('');
  const [rain, setRain] = useState({});
  const [isRainingToday, setIsRainingToday] = useState('');

  const isRaining = response => {
    for (let i = 0; i < response.weather.length; i++) {
        if (response.weather[i].main.toLowerCase().includes("rain")) {
            return true;
        }
    }
    return false;
  }

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?zip=${zipCode}&units=imperial&appid=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setRain(result);
          setZipCode('');
          // TODO: set to proper value
          setIsRainingToday(isRaining(result));
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
