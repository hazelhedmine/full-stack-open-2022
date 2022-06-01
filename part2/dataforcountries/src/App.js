import { useState, useEffect } from "react";
import axios from "axios";

import FindCountries from "./components/FindCountries";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [findCountries, setFindCountries] = useState("");
  useEffect(() => {
    console.log("effect");
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      console.log("promise fulfilled");
      setCountries(response.data);
    });
  }, []);

  return (
    <div>
      <FindCountries
        findCountries={findCountries}
        setFindCountries={setFindCountries}
      ></FindCountries>
      <Countries
        countries={countries}
        findCountries={findCountries}
      ></Countries>
    </div>
  );
};

export default App;
