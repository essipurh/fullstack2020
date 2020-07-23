import React from 'react';

const Country = ({ country }) => {
    return (
      <div>
        <h2>{country.name}</h2>
        <CountryInfo key={country.name} country={country} />
        <h3>Spoken languages</h3>
        <ul>
          {country.languages.map(language => 
           <Language key={language.iso639_1} language={language} />)}
        </ul>
        <Flag flag={country.name} country={country} />
      </div>
    )
  }
  
  const CountryInfo = ({country}) => {
    return(
      <div>
        <div><b>Capital </b>{country.capital}</div>
        <div><b>Population </b>{country.population}</div>
      </div>
    )
  }
  
  const Language = ({language}) => <li>{language.name}</li>
  
  const Flag = ({country}) => <img src={country.flag} alt="the country's flag" width="100" height="50"></img>

  export default Country