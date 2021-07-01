import './App.css';
import React, { useState, useEffect } from 'react';
import config from './config';
import ReactLoading from 'react-loading';

const rainAudio = new Audio("./rain.mp3");

function App() {
  const [zipCode, setZipCode] = useState('');
  const [response, setResponse] = useState();
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!response) return;
    if (response.isRainingToday) {
      rainAudio.play();
    } else {
      rainAudio.pause();
    }
  }, [response]);

  useEffect(() => {
    if (zipCode && zipCode.length === 5) {
      search();
    }
  }, [zipCode])

  const search = () => {
    setIsLoading(true);
    fetch(`${config.API_BASE_URL}/rainData?zip=${zipCode}`)
      .then(res => res.json())
      .then(result => {
        setIsLoading(false);
        setResponse(result);
      }).catch(error => {
        setIsLoading(false);
        console.log('error: ', error);
      });
  };

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
          />
        </div>
        <div className="spinner">
          <ReactLoading type="spin" hidden={!loading} />
        </div>
        {(typeof response != "undefined" && !loading) ? (
          <div>
            <div className="location-box">
              <div className="location">{response.city}, {response.state}</div>
              <div className="date">{new Date().toDateString()}</div>
            </div>
            <div className="rains-container">
              <div className="rains">
                {
                  response.isRainingToday === true
                    ? <div className="rains-text">Yes, it will rain today!</div>
                    : <div className="rains-text">No, it will not rain today :(</div>
                }
              </div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;