import React from 'react';

const Country = ({ country, setCountry }) => {
    const showCountry = () => setCountry(country.name);
    return (
        <div>
            {country.name}
            <button onClick={showCountry}>show</button>
        </div>
    );
};

export default Country;
