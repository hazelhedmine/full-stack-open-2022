import React from "react";
import numbers from "../services/numbers";

const Persons = ({ persons, setPersons, filterName }) => {
  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().startsWith(filterName.toLowerCase())
  );

  const deleteNumber = (person) => {
    if (window.confirm(`Delete ${person.name}`)) {
      numbers.remove(person.id).then((persons) => {
        console.log("person deleted :>> ", person.name);
        setPersons(persons);
      });
    }
  };

  return (
    <div>
      {personsToShow.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}{" "}
          <button type="button" onClick={() => deleteNumber(person)}>
            delete
          </button>
        </p>
      ))}
    </div>
  );
};

export default Persons;
