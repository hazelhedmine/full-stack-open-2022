import React from "react";
import { useEffect } from "react";

import Country from "./Country";
import CountryWeatherInfo from "./CountryWeatherInfo";

const Countries = ({
  countries,
  findCountries,
  countryWeather,
  handleLatChange,
  handleLonChange,
}) => {
  const countriesToShow = countries.filter((country) =>
    country.name.common.toLowerCase().includes(findCountries.toLowerCase())
  );

  console.log("countriesToShow :>> ", countriesToShow);

  useEffect(() => {
    if (countriesToShow.length === 1) {
      handleLatChange(countriesToShow[0].latlng[0]);
      handleLonChange(countriesToShow[0].latlng[1]);
    }
  }, [countriesToShow, handleLatChange, handleLonChange]);

  if (countriesToShow.length > 10) {
    return <p>Too many matches, specify another filter.</p>;
  } else if (countriesToShow.length === 1) {
    console.log("countryWeather in countries.js :>> ", countryWeather);
    return (
      <CountryWeatherInfo
        country={countriesToShow[0]}
        countryWeather={countryWeather}
      ></CountryWeatherInfo>
    );
  }

  return (
    <div>
      {countriesToShow.map((country) => (
        <div key={country.name.common}>
          <Country
            country={country}
            countryWeather={countryWeather}
            handleLatChange={handleLatChange}
            handleLonChange={handleLonChange}
          ></Country>
        </div>
      ))}
    </div>
  );
};

export default Countries;
