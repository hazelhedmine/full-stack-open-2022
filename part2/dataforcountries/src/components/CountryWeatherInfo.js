import React from "react";

const CountryWeatherInfo = ({ country, countryWeather }) => {
  console.log("country :>> ", country);
  console.log("countryWeather :>> ", countryWeather);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <b>languages:</b>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="Flag"></img>
      <h3>Weather in {country.name.common}</h3>
      <p>temperature {countryWeather.main.temp} Celcius</p>
      <img
        src={`http://openweathermap.org/img/wn/${countryWeather.weather[0].icon}@2x.png`}
        alt="weather icon"
      ></img>
      <p>wind {countryWeather.wind.speed} m/s</p>
    </div>
  );
};

export default CountryWeatherInfo;
