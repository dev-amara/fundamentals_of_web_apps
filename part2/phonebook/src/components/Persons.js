import React from 'react';

const Persons = ({ persons, deletePerson }) => {
    const showPersons = () =>
        persons.map((person) => (
            <div key={person.name}>
                {person.name} {person.number}
                {" "}
                <button onClick={() => deletePerson(person.id, person.name)}>delete</button>
            </div>
        ));
    return <>{showPersons()}</>;
};
export default Persons;
