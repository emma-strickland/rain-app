import './App.css';

const api = {
  key: "93da148cde43b30ed7c6df2296294e89",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  // const dateBuilder = (date) => {
  //   let date = new Date().toDateString()
  // }
  return (
    <div className="App">
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Enter zip code"
          />
        </div>
        <div className="location-box">
          <div className="location">Brooklyn, NY, USA</div>
          <div classname="date">{new Date().toDateString()}</div>
        </div>
        <div className="rain">
          <div className="rain-true">Yes, it will rain today</div>
          <div className="rain-false">No, it will not rain today :(</div>
        </div>
      </main>
    </div>
  );
}

export default App;
