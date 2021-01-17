import React from 'react';
import CountryDetails from './CountryDetails';
import Country from './Country';

const CountryList = ({ countries, setSelectedCountry, showCountry }) => {
    if (countries.length > 10) {
        return <div>Too many matches, specify another filter</div>;
    } else {
        if (countries.length === 1) {
            return <CountryDetails country={countries[0]} />;
        } else if (countries.length > 1) {
            return countries.map((country) => (
                <Country key={country.name} country={country} setCountry={setSelectedCountry}
                         showCountry={showCountry} />
            ));
        } else {
            return <div>No countries match your search.</div>;
        }
    }
};

export default CountryList;
