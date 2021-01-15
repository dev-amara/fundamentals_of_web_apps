import React, { useState } from 'react';

const App = () => {
    const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: '040-1234567' }]);
    const [nameAndNumber, setNameAndNumber] = useState({ name: '', number: '' });

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

    return (
        <div>
            <h2>Phonebook</h2>
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
            <div>
                {persons.map((value) => (
                    <div key={value.name}>
                        {value.name} {value.number}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
