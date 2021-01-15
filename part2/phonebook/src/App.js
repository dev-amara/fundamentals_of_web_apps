import React, { useState } from 'react';

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' },
    ]);
    const [nameAndNumber, setNameAndNumber] = useState({ name: '', number: '' });
    const [newSearch, setNewSearch] = useState('');

    const { name, number } = nameAndNumber;

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

    const showPersons = () => {
        const data = persons.filter((person) => person.name.toLowerCase().includes(newSearch.toLowerCase()));
        return data.map((value) => (
            <div key={value.name}>
                {value.name} {value.number}
            </div>
        ));
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <div>
                <p>filter shown with</p>
                <input onChange={handleSearch} value={newSearch} name="search" />
            </div>
            <h2>add a new</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    name: <input onChange={handleChange} value={name} name="name" />
                </div>
                <div>
                    number: <input onChange={handleChange} value={number} name="number" />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <div>{showPersons()}</div>
        </div>
    );
};

export default App;
