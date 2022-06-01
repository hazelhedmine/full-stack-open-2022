import React from "react";

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
    const country = countriesToShow[0];
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
  }

  return (
    <div>
      {countriesToShow.map((country) => (
        <p key={country.name.common}>{country.name.common}</p>
      ))}
    </div>
  );
};

export default Countries;
