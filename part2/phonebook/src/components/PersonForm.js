import React from 'react';

const PersonForm = ({ person, onChange, submit }) => {
    const { name, number } = person;
    return (
        <form onSubmit={submit}>
            <div>
                name: <input onChange={onChange} value={name} name="name" />
            </div>
            <div>
                number: <input onChange={onChange} value={number} name="number" />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    );
};

export default PersonForm;
