import React from 'react';

const Filter = ({ selectCountry, handleChange }) => {
    return (
        <div>
            <label>find countries </label>
            <input type="text" onChange={handleChange} value={selectCountry} />
        </div>
    );
};

export default Filter;
