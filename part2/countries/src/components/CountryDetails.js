import React from 'react';
import Languages from './Languages';
import Weather from './Weather';

const CountryDetails = ({ country }) => {
    const { population, capital, flag, name } = country;

    return (
        <div>
            <div key={name}>
                <h2>{name}</h2>
                <div>capital {capital}</div>
                <div>population {population}</div>
            </div>
            <div>
                <h3>Sopken languages</h3>
                <Languages country={country} />
            </div>
            <img src={flag} height="100" width="100" alt={`flag of ${name}`} />
            <div>
                <Weather country={country} />
            </div>
        </div>
    );
};

export default CountryDetails;
