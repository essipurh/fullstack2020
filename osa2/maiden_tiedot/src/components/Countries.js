import React from 'react';
import Country from './Country'
//import Weather from './Weather'

const Countries = ({ countriesToShow, onClick}) => {
    if (countriesToShow.length > 10) return <div>Too many</div>
    if (countriesToShow.length > 1) {
      return (
        <div>
            {countriesToShow.map(country =>
              <CountryLine key={country.name} country={country} onClick={() => onClick(country)}/>
            )}
        </div>
      )
    }
  
    return (
      <div>
        {countriesToShow.map(country =>
          <Country key={country.name} country={country} />
          
        )}
      </div>
    )
  }
  
  const CountryLine = ({country, onClick}) => {
    return(
      <div>
        {country.name}
        <button onClick={onClick}>show</button>
      </div>
    )
  }

  export default Countries