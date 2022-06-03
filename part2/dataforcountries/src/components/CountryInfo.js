import React from "react";

const CountryInfo = ({ country }) => {
  console.log("country :>> ", country);

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
    </div>
  );
};

export default CountryInfo;
