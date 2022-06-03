import { useState, useEffect } from "react";
import axios from "axios";

import FindCountries from "./components/FindCountries";
import Countries from "./components/Countries";

const App = () => {
  const API_KEY = process.env.REACT_APP_API_KEY;

  const [countries, setCountries] = useState([]);
  const [findCountries, setFindCountries] = useState("");
  const [countryWeather, setCountryWeather] = useState([]);
  const [lat, setLat] = useState("1");
  const [lon, setLon] = useState("1");

  useEffect(() => {
    console.log("effect");
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      console.log("promise fulfilled");
      setCountries(response.data);
    });
  }, []);

  useEffect(() => {
    console.log("weather effect");
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      )
      .then((response) => {
        console.log("weather promise fulfilled");
        setCountryWeather(response.data);
      });
  }, [lat, lon, API_KEY]);

  // cannot put here because it triggers a re-render, so an infinite
  // setAPI(API_KEY);
  const handleLatChange = (lat) => setLat(lat);
  const handleLonChange = (lon) => setLon(lon);

  if (!findCountries) {
    return (
      <div>
        <FindCountries
          findCountries={findCountries}
          setFindCountries={setFindCountries}
        ></FindCountries>
      </div>
    );
  }

  return (
    <div>
      <FindCountries
        findCountries={findCountries}
        setFindCountries={setFindCountries}
      ></FindCountries>
      <Countries
        countries={countries}
        findCountries={findCountries}
        countryWeather={countryWeather}
        handleLatChange={handleLatChange}
        handleLonChange={handleLonChange}
      ></Countries>
    </div>
  );
};

export default App;
