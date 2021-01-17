import React, { useState, useEffect } from 'react';
import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import axios from 'axios';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [nameAndNumber, setNameAndNumber] = useState({ name: '', number: '' });
    const [newSearch, setNewSearch] = useState('');

    const { name } = nameAndNumber;

    useEffect(()=>{
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data)
            })
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();

        const indexOfPerson = persons.map((person) => person.name).includes(name);

        if (!indexOfPerson) {
            axios
                .post('http://localhost:3001/persons', nameAndNumber)
                .then((response) => response.data)
                .then((newPerson) => {
                    setPersons(persons.concat(newPerson));
                    setNameAndNumber({ number: '', name: '' });
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        } else {
            alert(`${name} is already added to phonebook`);
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
            <Filter newSearch={newSearch} handleSearch={handleSearch} />

            <h3>add a new</h3>
            <PersonForm person={nameAndNumber} onChange={handleChange} submit={handleSubmit} />

            <h3>Numbers</h3>
            <Persons persons={showPersons()} />
        </div>
    );
};

export default App;
