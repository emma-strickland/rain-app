import './App.css';
import React, { useState } from 'react';


const api = {
  key: "93da148cde43b30ed7c6df2296294e89",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [rain, setRain] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=imperial&appid=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setRain(result);
          setQuery('');
          console.log(result)
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
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof rain.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{rain.name}, {rain.sys.country}</div>
              <div className="date">{new Date().toDateString()}</div>
            </div>
            <div className="rains">
              <div className="rain-true">{(rain.main === "rain")}

                Yes, it will rain today!</div>
              <div className="rain-false">No, it will not rain today :(</div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
