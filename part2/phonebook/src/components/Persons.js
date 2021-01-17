import React from 'react'

const Persons = ({ persons }) => {
    const showPersons = () =>
        persons.map((person) =>
            <div key={person.name}>
                {person.name}  {person.number}
            </div>)
    return (
        <>
            {showPersons()}
        </>
    )
}
export default Persons
