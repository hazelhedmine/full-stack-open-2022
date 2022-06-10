import React from "react";
import numbers from "../services/numbers";

const PersonForm = ({
  persons,
  newName,
  newNumber,
  setPersons,
  setNewName,
  setNewNumber,
  setMessage,
  setStyle,
}) => {
  const addPerson = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      const person = persons.find((n) => n.name === newName);
      if (
        window.confirm(
          `${person.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const updatedPerson = { ...person, number: newNumber };
        numbers
          .update(person.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.name !== newName ? person : returnedPerson
              )
            );
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

      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
    };

    console.log("personObject :>> ", personObject);

    numbers
      .create(personObject)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
        setMessage(`Added ${newName}`);
        setStyle("successMessage");
        setTimeout(() => {
          setMessage(null);
        }, 5000); //5s
      })
      .catch((error) => {
        console.log("error.response.data :>> ", error.response.data);
        setMessage(error.response.data.error);
        setStyle("errorMessage");
        setTimeout(() => {
          setMessage(null);
        }, 5000); //5s
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
