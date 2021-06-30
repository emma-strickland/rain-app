import './App.css';
import React, { useState, useEffect } from 'react';
import config from './config';

const rainAudio = new Audio("./rain.mp3");

function App() {
  const [zipCode, setZipCode] = useState('');
  const [response, setResponse] = useState();

  useEffect(() => {
    if (!response) return;
    if (response.isRainingToday) {
      rainAudio.play();
    } else {
      rainAudio.pause();
    }
  }, [response]);

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${config.API_BASE_URL}/rainData?zip=${zipCode}`)
        .then(res => res.json())
        .then(result => {
          setResponse(result);
        }).catch(error => {
          console.log('error: ', error);
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
        {(typeof response != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{response.city}, {response.state}</div>
              <div className="date">{new Date().toDateString()}</div>
            </div>
            <div className="rains">
              {
                response.isRainingToday === true
                  ? <div className="rains-text">Yes, it will rain today!</div>
                  : <div className="rains-text">No, it will not rain today :(</div>
              }
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;