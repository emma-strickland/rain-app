import './App.css';
import React, { useState } from 'react';

const api = "http://localhost:4000/rainData";

function App() {
  const [zipCode, setZipCode] = useState('');
  const [response, setResponse] = useState();
  //const [error, setError] = useState();

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api}?zip=${zipCode}`)
        .then(res => res.json())
        .then(result => {
          console.log('result: ', result);
          // check response code
          // if 200, set response, otherwise set error
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
              <div className="location">{response.city}, {response.country}</div>
              <div className="date">{new Date().toDateString()}</div>
            </div>
            <div className="rains">
              {
                response.isRainingToday === true
                  ? <div className="rain-true">Yes, it will rain today!</div>
                  : <div className="rain-false">No, it will not rain today :(</div>
              }
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;