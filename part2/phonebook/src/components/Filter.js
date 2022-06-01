import React from "react";

const Filter = ({ filterName, setFilterName }) => {
  const handleFilterName = (event) => {
    console.log("filter input :>> ", event.target.value);
    setFilterName(event.target.value);
  };

  return (
    <div>
      filter shown with{" "}
      <input value={filterName} onChange={handleFilterName}></input>
    </div>
  );
};

export default Filter;
