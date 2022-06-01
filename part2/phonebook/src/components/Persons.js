import React from "react";

const Persons = ({ persons, filterName }) => {
  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().startsWith(filterName.toLowerCase())
  );

  return (
    <div>
      {personsToShow.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default Persons;
