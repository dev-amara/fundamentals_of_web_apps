import React, { useState } from 'react';
import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' },
    ]);
    const [nameAndNumber, setNameAndNumber] = useState({ name: '', number: '' });
    const [newSearch, setNewSearch] = useState('');

    const { name } = nameAndNumber;

    const handleSubmit = (event) => {
        event.preventDefault();

        const indexOfPerson = persons.map((person) => person.name).includes(name);

        if (!indexOfPerson) {
            setPersons(persons.concat(nameAndNumber));
            setNameAndNumber({ number: '', name: '' });
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
            <PersonForm person={nameAndNumber} onChange={handleChange} submit={handleSubmit}/>

            <h3>Numbers</h3>
            <Persons persons={showPersons()} />
        </div>
    );
};

export default App;
