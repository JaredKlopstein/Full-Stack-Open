import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState('')


  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    if (persons.some((person) => person.name === newName)) {
      if (!confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        return;
      }
      const person = persons.find((p) => p.name === newName);
      const updatedPerson = { ...person, number: newNumber };
      personService.update(person.id, updatedPerson)
      .then((returnedPerson) => {
        setNotification(`Updated ${returnedPerson.name}`);
        setTimeout(() => {
          setNotification('');
        }, 5000);
        setPersons(
          persons.map((person) => (person.id !== returnedPerson.id ? person : returnedPerson))
        );
      })
      .catch((error) => {
        setNotification(`Error updating person: ${error.message}`); 
        setTimeout(() => {
          setNotification('');
        }, 5000);
        setPersons(persons.filter((p) => p.id !== person.id));
      });
      setNewName("");
      setNewNumber("");
      return;
    }
    personService
    .create(personObject)
    .then(returnedPerson => {
      setNotification(`Added ${returnedPerson.name}`);
      setTimeout(() => {
        setNotification('');
      }, 5000)
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber("");
    })
  };

  const deletePerson = (id) => {
    const person = persons.find((p) => p.id === id);
    if (person && window.confirm(`Delete ${person.name}?`)) {
      personService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter((p) => p.id !== id));
      })
      .catch(() => {
        setNotification(`Error: Information for ${person.name} has already been removed from server`);
        setTimeout(() => {
          setNotification('');
        }, 5000)
      });
    }
  };

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const personsToShow = filter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons;

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handlePersonChange={handlePersonChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson}/>
    </div>
  );
};

export default App;
