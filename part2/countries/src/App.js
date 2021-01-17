import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import CountryList from './components/CountryList';

function App() {
    const [countries, setCountries] = useState([]);
    const [selectCountry, setSelectCountry] = useState('');

    useEffect(() => {
        axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
            setCountries(response.data);
        });
    }, []);

    const handleChange = (event) => setSelectCountry(event.target.value);

    const showCountries = countries.filter((country) =>
        country.name.toLowerCase().includes(selectCountry.toLowerCase()),
    );

    return (
        <div>
            <Filter selectCountry={selectCountry} handleChange={handleChange} />
            <CountryList countries={showCountries} setSelectedCountry={setSelectCountry} />
        </div>
    );
}

export default App;
