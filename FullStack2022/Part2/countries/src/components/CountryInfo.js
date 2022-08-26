import axios from "axios";
import React, { useEffect, useState } from "react";
const api_key = process.env.REACT_APP_API_KEY;

const CountryInfo = ({country}) => {
    const [weatherData, setWeatherData] = useState({});

    useEffect(() => {
        axios
            .get(
                `https://api.openweathermap.org/data/3.0/onecall?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&units=metric&appid=${api_key}`
            )
            .then((response) => {
                setWeatherData({
                    'temperature': response.data.current.temp,
                    'weatherIcon':
                        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
                    'description': response.data.current.weather.description,
                    'windSpeed': response.data.current.wind_speed
                });
            })
    },[country]);

    return (
        <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <h3>Languages</h3>
        <ul>
            {Object.values(country.languages).map((val) => {
                return <li key={val}>{val}</li>;
            })}
        </ul>
        <img 
          src={country.flags.png}
          alt='country flag'
          />

        <h2>Weather in {country.capital}</h2>
        <p>temperature: {weatherData.temperature} Celcius</p>
        <img src={weatherData.weatherIcon} alt={weatherData.description}/>
        <p>wind {weatherData.windSpeed} m/s</p>
      </div>
    )
}

export default CountryInfo;