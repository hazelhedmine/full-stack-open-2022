import React from "react";
import { useState } from "react";

import Country from "./Country";
import CountryInfo from "./CountryInfo";

const Countries = ({ countries, findCountries }) => {
  if (!findCountries) {
    return;
  }

  const countriesToShow = countries.filter((country) =>
    country.name.common.toLowerCase().startsWith(findCountries.toLowerCase())
  );

  console.log("countriesToShow :>> ", countriesToShow);

  if (countriesToShow.length > 10) {
    return <p>Too many matches, specify another filter.</p>;
  } else if (countriesToShow.length === 1) {
    return <CountryInfo country={countriesToShow[0]}></CountryInfo>;
  }

  return (
    <div>
      {countriesToShow.map((country) => (
        <div key={country.name.common}>
          <Country country={country}></Country>
        </div>
      ))}
    </div>
  );
};

export default Countries;
