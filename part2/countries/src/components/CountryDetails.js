import React from 'react';
import Languages from './Languages';

const CountryDetails = ({ country }) => {
    return (
        <div>
            <div key={country.name}>
                <h2>{country.name}</h2>
                <p>Capital {country.capital}</p>
                <p>Population {country.population}</p>
            </div>
            <div>
                <h3>Languages</h3>
                <Languages country={country} />
            </div>
            <img src={country.flag} height="100" width="100" alt={`flag of ${country.name}`} />
        </div>
    );
};

export default CountryDetails;
