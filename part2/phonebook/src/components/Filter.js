import React from 'react';

const Filter = ({newSearch, handleSearch}) => {
    return (
        <div>
            <p>filter shown with</p>
            <input onChange={handleSearch} value={newSearch} name="search" />
        </div>
    );
};

export default Filter;
