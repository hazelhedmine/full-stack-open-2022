import React from "react";
import { useState } from "react";

import CountryInfo from "./CountryInfo";

const Country = ({
  country,
  countryWeather,
  handleLatChange,
  handleLonChange,
}) => {
  console.log("country :>> ", country);
  const [showInfo, setShowInfo] = useState(false);

  const handleShowCountry = (country) => {
    if (showInfo.hasOwnProperty(country)) {
      setShowInfo({ showInfo: { country: true } });
    }
    setShowInfo(!showInfo);
  };

  return (
    <div>
      <p>
        {country.name.common}{" "}
        <button
          type="button"
          onClick={() => handleShowCountry(country.name.common)}
        >
          show
        </button>
      </p>
      <div>
        {showInfo ? (
          <CountryInfo
            country={country}
            countryWeather={countryWeather}
            handleLatChange={handleLatChange}
            handleLonChange={handleLonChange}
          ></CountryInfo>
        ) : null}
      </div>
    </div>
  );
};

export default Country;
