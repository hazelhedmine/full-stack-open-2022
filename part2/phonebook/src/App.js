import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} setFilterName={setFilterName}></Filter>
      <h3>Add a New</h3>
      <PersonForm
        persons={persons}
        newName={newName}
        newNumber={newNumber}
        setPersons={setPersons}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      ></PersonForm>
      <h3>Numbers</h3>
      <Persons persons={persons} filterName={filterName}></Persons>
    </div>
  );
};

export default App;
