import React, { useState, useEffect } from 'react';
import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import personService from './services/persons';
import SuccessNotification from './components/SuccessNotification';
import './index.css';
import ErrorNotification from './components/ErrorNotification';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [nameAndNumber, setNameAndNumber] = useState({ name: '', number: '' });
    const [newSearch, setNewSearch] = useState('');
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const { name } = nameAndNumber;

    useEffect(() => {
        personService.getAll().then((persons) => {
            setPersons(persons);
        });
    }, []);

    const successContent = (message) => {
        setSuccessMessage(message);
        setTimeout(() => {
            setSuccessMessage(null);
        }, 5000);
    };

    const errorContent = (message) => {
        setErrorMessage(message);
        setTimeout(() => {
            setErrorMessage(null);
        }, 5000);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const indexOfPerson = persons.map((person) => person.name).includes(name);

        if (!indexOfPerson) {
            await personService
                .create(nameAndNumber)
                .then((newPerson) => {
                    setPersons(persons.concat(newPerson));
                    successContent(`Added ${newPerson.name}`);
                    setNameAndNumber({ number: '', name: '' });
                })
                .catch((error) => {
                    errorContent(error, error.message);
                    console.log(error.response.data);
                });
        } else {
            const personInArray = persons.filter((person) => person.name === name);
            const id = personInArray[0].id;

            window.confirm(
                `${nameAndNumber.name} is already added to the phonebook, replace the old number with a new one?`,
            );
            personService
                .update(id, { ...nameAndNumber, id: id })
                .then((returnedPerson) => {
                    setPersons(
                        persons.map((person) =>
                            person.id === id
                                ? {
                                      ...nameAndNumber,
                                      id: returnedPerson.id,
                                  }
                                : person,
                        ),
                    );
                    successContent(`Update ${returnedPerson.name}`);
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        }
    };

    const handleDelete = async (id, name) => {
        if (window.confirm(`Delete ${name}?`)) {
            personService
                .deletePerson(id)
                .then(() => {
                    setPersons(persons.filter((p) => p.id !== id));
                    setSuccessMessage(`Information of ${name} has been removed from the server`);
                })
                .catch((error) => {
                    errorContent(`Information of ${name} has already been remove from server`);
                    console.log(error.response.data);
                });
        }
    };

    const handleChange = (event) => {
        event.preventDefault();
        const { value, name } = event.target;
        nameAndNumber[name] = value;
        setNameAndNumber({ ...nameAndNumber });
    };

    const handleSearch = (event) => setNewSearch(event.target.value);

    const showPersons = () => persons.filter((person) => person.name.toLowerCase().includes(newSearch.toLowerCase()));

    return (
        <div>
            <h2>Phonebook</h2>
            <SuccessNotification message={successMessage} />
            <ErrorNotification message={errorMessage} />
            <Filter newSearch={newSearch} handleSearch={handleSearch} />

            <h3>add a new</h3>
            <PersonForm person={nameAndNumber} onChange={handleChange} submit={handleSubmit} />

            <h3>Numbers</h3>
            <Persons persons={showPersons()} deletePerson={handleDelete} />
        </div>
    );
};

export default App;
