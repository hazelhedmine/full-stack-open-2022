import React from "react";
import numbers from "../services/numbers";

const PersonForm = ({
  persons,
  newName,
  newNumber,
  setPersons,
  setNewName,
  setNewNumber,
}) => {
  const addPerson = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      console.log("Already Added :>> ", newName);
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
    };

    console.log("personObject :>> ", personObject);

    numbers.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
    });
  };

  const handleNameChange = (event) => {
    console.log("name input :>> ", event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log("number input :>> ", event.target.value);
    setNewNumber(event.target.value);
  };

  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange}></input>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
