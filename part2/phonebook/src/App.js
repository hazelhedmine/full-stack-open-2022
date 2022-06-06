import { useState, useEffect } from "react";
import numbers from "./services/numbers";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  const [message, setMessage] = useState(null);
  const [style, setStyle] = useState("");

  useEffect(() => {
    console.log("effect");
    numbers.getAll().then((initialPersons) => {
      console.log("promise fulfilled");
      setPersons(initialPersons);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} style={style}></Notification>
      <Filter filterName={filterName} setFilterName={setFilterName}></Filter>
      <h3>Add a New</h3>
      <PersonForm
        persons={persons}
        newName={newName}
        newNumber={newNumber}
        setPersons={setPersons}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        setMessage={setMessage}
        setStyle={setStyle}
      ></PersonForm>
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        setPersons={setPersons}
        filterName={filterName}
      ></Persons>
    </div>
  );
};

export default App;
