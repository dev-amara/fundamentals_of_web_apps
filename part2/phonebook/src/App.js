import React, { useState } from 'react';

const App = () => {
    const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
    const [newName, setNewName] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const indexOfPerson = persons.map(person => person.name).includes(newName);

        if (!indexOfPerson) {
            setPersons(persons.concat({ name: newName }));
            setNewName('');
        } else {
            alert(`${newName} is already added to phonebook`);
        }
    };

    const handlePersonChange = (event) => setNewName(event.target.value);

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    name: <input onChange={handlePersonChange} value={newName} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <div>
                {persons.map((value) =>
                     <div key={value.name}>{value.name}</div>
                )}
            </div>
        </div>
    );
};

export default App;
