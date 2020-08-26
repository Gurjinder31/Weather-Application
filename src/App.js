import React, {useState} from 'react';
import axios from 'axios';

import style from './css/style.css';

    const api = {
      key: 'bab80e6caffebbdf9b95130e0dcaec0d',
      baseUrl: 'http://api.openweathermap.org/data/2.5/',
    }
  
    

const App = () =>{
  const datebuilder = (d) =>{
                
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    var day = days[d.getDay()];
    var date = d.getDate();
    var month = months[d.getMonth()];
    var year = d.getFullYear();

    return `${day}, ${date} ${month}, ${year} !`;
}
    const [query , setQuery] = useState("");
    const [weather , setWeather] = useState({});
    
  const prevent = (e) => {
         e.preventDefault();
  }  
    const search = async (e) =>{
      if(e.key === "Enter") {
        const response = await axios.get(`${api.baseUrl}weather?q=${query}&units=metric&appid=${api.key}`);
        
        setQuery("");
        setWeather(response.data);
        console.log(response);
        
          }
     };
     
  
    return(
       
      <div className={typeof weather.main != "undefined" ? weather.main.temp > 18 ? "app hot" : "app cold" : "app"}>
       <main className="back">
              <form onSubmit={prevent} className="form-inline">
              <div className="form-group  mx-auto mt-4">
              <input className="form-control my-form  mr-sm-2" type="text" placeholder="Search"
              onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search} 
              />
              {/* <button  className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> */}
              </div>
             </form>    
         
              {typeof weather.main != "undefined" ? (
                  <div>
                    <div className="location-box text-center mt-3">
                      <div>
                      {weather.name}, {weather.sys.country}
                      </div>
                    <div className="date font-italic">{datebuilder(new Date())}</div>  
                      </div>
                    <div className="weather-box text-center">
                      <div className="temp">
                        {Math.round(weather.main.temp)}°C
                      </div>
                      <div className="season">{weather.weather[0].main}</div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
         
      </main>  
      </div>
    
    );
  
};

export default App;
