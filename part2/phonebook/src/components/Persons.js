import React from "react";
import numbers from "../services/numbers";

const Persons = ({ persons, setPersons, filterName, setMessage, setStyle }) => {
  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().startsWith(filterName.toLowerCase())
  );

  const deleteNumber = (person) => {
    if (window.confirm(`Delete ${person.name}`)) {
      numbers
        .remove(person.id)
        .then((persons) => {
          console.log("person deleted :>> ", person.name);
          setPersons(persons.filter((p) => p.name !== person.name));
        })
        .catch((error) => {
          setMessage(
            `Information of '${person.name}' was already removed from server`
          );
          setStyle("errorMessage");
          setPersons(persons.filter((p) => p.name !== person.name));
          setTimeout(() => {
            setMessage(null);
          }, 5000); //5s
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
