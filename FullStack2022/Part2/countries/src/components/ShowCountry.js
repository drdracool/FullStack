import React, { useState } from "react";
import CountryInfo from "./CountryInfo";


const ShowCountry = ({filtered}) => {
    const [showButton, setShowButton] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState({})

    if (showButton) {
        return <CountryInfo country={selectedCountry}/>
    } else {
        return filtered.map(country => {
            return (
                <div key={country.name.common}>
                  {country.name.common}
                  <button
                    onClick={() => {
                      setShowButton(true);
                      setSelectedCountry(country);
                    }}
                  >
                    Show
                  </button>
                </div>
            );
        })
    }
}

export default ShowCountry;