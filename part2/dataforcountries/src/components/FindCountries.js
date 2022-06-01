import React from "react";

const FindCountries = ({ findCountries, setFindCountries }) => {
  const handleFindCountries = (event) => {
    console.log("find countries :>> ", event.target.value);
    setFindCountries(event.target.value);
  };

  return (
    <div>
      find countries{" "}
      <input value={findCountries} onChange={handleFindCountries}></input>
    </div>
  );
};

export default FindCountries;
