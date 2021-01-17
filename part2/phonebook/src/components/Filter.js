import React from 'react';

const Filter = ({ newSearch, handleSearch }) => {
    return (
        <div>
            filter shown with <input onChange={handleSearch} value={newSearch} name="search" />
        </div>
    );
};

export default Filter;
