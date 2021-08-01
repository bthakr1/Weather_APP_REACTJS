
import './App.css';
import React , { useState } from 'react';


const api = {
  key : "11d0b48d473911fdebd87762e9f8b1d1",
  base : "https://api.openweathermap.org/data/2.5/"
}


function App() {


  const [query,setQuery] = useState('');
  const [weather,setWeather] = useState({});

  const search = evt => {

    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result)

    });
  }

  }

  const DATE_OPTIONS = {weekday : 'short', year : 'numeric', month : 'short', day : 'numeric'}


  return (
    <div className={(typeof weather.main != "undefined") 
                  ? ((weather.main.temp > 16) 
                    ? 'app-warm'
                    :'app')
                  :'app'}>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search ..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
            />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
          <div className="location">{weather.name}, {weather.sys.country}</div>
          <div className="date">{(new Date()).toLocaleDateString('en-US',DATE_OPTIONS)}</div>
        </div>
        <div className="weather-box">
          <div className="temp">
            {Math.round(weather.main.temp)}˚C
          </div>
          <div className="weather">{weather.weather[0].main}</div>
          <div className="tempMax">Max Temp : {Math.round(weather.main.temp_max)}˚C</div>
          <div className="tempMin">Min Temp : {Math.round(weather.main.temp_min)}˚C</div>
        </div>
        </div>
        ): ('')}
      </main>
    </div>
  );
}

export default App;
