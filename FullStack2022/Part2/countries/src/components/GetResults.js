import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import CountryInfo from './CountryInfo';
import ShowCountry from './ShowCountry';

const GetResults = ({query}) => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        axios
          .get('https://restcountries.com/v3.1/all')
          .then(response => {
            setCountries(response.data)
          })
      }, [])

        let filtered = [];

        if(query.length > 0){
            filtered = countries.filter(country => 
                country.name.common.toLowerCase().includes(query.toLowerCase()))
        } else {
            filtered = countries
        }
    
        if (filtered.length > 10){
          return <p>Too many matches, specify another filter</p>;
        } else if (filtered.length === 1) {
            return (
             <CountryInfo country={filtered[0]}/>
            )
          }else if (filtered.length <= 10 && filtered.length > 1) {
          return <ShowCountry filtered={filtered}/>
        } else{
          return null;
      }
}

export default GetResults;